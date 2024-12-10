import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useGet, usePost } from "../../Api";
import { useNavigate } from "react-router";
import { faClock, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddLecture = () => {
    // States for form data, categories, tags, courses, and UI feedback
    const [formData, setFormData] = useState({ tagIds: [] });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(0); // State for estimated time


    // Refs for dropzone and file input
    const dropZoneRef = useRef(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    // API Hooks
    const { ApiData: AddCourseData, post: GetAddCourse } = usePost(`lectures/create`);
    const { ApiData: CategoriesData, get: GetCategories } = useGet(`category`);
    const { ApiData: TagsData, get: GetTags } = useGet(`tags`);
    const { ApiData: CourseData, get: GetCourse } = useGet(`courses`);

    // Load initial data (categories, tags, courses)
    useEffect(() => {
        GetCategories();
        GetTags();
        GetCourse();
    }, []);

    useEffect(() => {
        if (CategoriesData) setCategories(CategoriesData);
    }, [CategoriesData]);

    useEffect(() => {
        if (TagsData) setTags(TagsData);
    }, [TagsData]);

    useEffect(() => {
        if (CourseData) setCourses(CourseData);
    }, [CourseData]);

    // Handle success modal and redirection
    useEffect(() => {
        if (AddCourseData) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/lecture-management');
            }, 3000);
        }
    }, [AddCourseData, navigate]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "tagIds" ? [Number(value)] : value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.description) {
            GetAddCourse(formData);
        } else {
            alert("Please fill all the required fields.");
        }
    };

    // Video Upload Logic
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const BASE_URL = 'https://devapi.archcitylms.com/lectures';
    let connectionId = '';

    const preventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleFiles = async (files) => {
        if (files.length > 0) await uploadFile(files[0]);
    };



    const updateProgressBar = (current, total) => {
        const percentage = (current / total) * 100;
        setProgress(percentage); // Assuming you already have `setProgress` in your state
    };
    
    const uploadFile = async (file) => {
        connectionId = crypto.randomUUID();
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        setStatus(`Uploading ${file.name}...`);
        const startTime = Date.now(); // Record the start time

        // Start SSE for progress
        const eventSource = new EventSource(`${BASE_URL}/progress/${connectionId}`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 'success') {
                setStatus('Upload Complete!');
                setProgress(100);
                setCloudinaryResponse(data.cloudinaryResponse);
                setFormData({
                    ...formData,
                    videoUrl: data?.data?.videoUrl
                })
                eventSource.close();
            } else if (data.status === 'error') {
                setStatus(`Error: ${data.error}`);
                eventSource.close();
            }
        };

        let uploadedBytes = 0;

        // Upload chunks sequentially
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, file.size);
            const chunk = file.slice(start, end);

            const formData = new FormData();
            formData.append('chunkIndex', chunkIndex.toString());
            formData.append('totalChunks', totalChunks.toString());
            formData.append('fileName', file.name);
            formData.append('connectionId', connectionId);
            formData.append('file', chunk);

            try {
                const response = await fetch(`${BASE_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                uploadedBytes += chunk.size;
                const elapsedTime = (Date.now() - startTime) / 1000; // in seconds
                const uploadSpeed = uploadedBytes / elapsedTime; // bytes per second
                const remainingBytes = file.size - uploadedBytes;
                const remainingTime = remainingBytes / uploadSpeed; // seconds

                setEstimatedTime(Math.ceil(remainingTime)); // Update estimated time
                updateProgressBar(chunkIndex + 1, totalChunks);
            } catch (error) {
                setStatus(`Upload failed: ${error.message}`);
                eventSource.close();
                break;
            }
        }
    };


    return (
        <DashboardLayout>
            <div className="dashCard mb-4">
                <div className="row mb-3">
                    <div className="col-12 mb-2">
                        <h2 className="mainTitle">
                            <BackButton />
                            Add New Lecture
                        </h2>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <CustomInput
                                        label="Add Lecture Name"
                                        required
                                        id="name"
                                        type="text"
                                        placeholder="Enter Lecture Name"
                                        labelClass="mainLabel"
                                        inputClass="mainInput"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <SelectBox
                                        selectClass="mainInput"
                                        name="courseId"
                                        label="Select Course"
                                        placeholder="Select Course"
                                        required
                                        value={formData.courseId || ""}
                                        option={courses}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <SelectBox
                                        selectClass="mainInput"
                                        name="categoryId"
                                        label="Select Category"
                                        placeholder="Select Category"
                                        required
                                        value={formData.categoryId || ""}
                                        option={categories}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <SelectBox
                                        selectClass="mainInput"
                                        name="tagIds"
                                        label="Select Tags"
                                        placeholder="Select Tags"
                                        value={formData.tagIds || ""}
                                        option={tags}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12 mb-4">
                                    <textarea
                                        name="description"
                                        required
                                        className="form-control shadow border-0"
                                        placeholder="Enter Lecture Description"
                                        rows="5"
                                        value={formData.description || ""}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div
                                        ref={dropZoneRef}
                                        className="drop-zone text-center py-4 px-3 border rounded shadow-sm"
                                        onDragOver={preventDefaults}
                                        onDragEnter={() => dropZoneRef.current.classList.add('dragover')}
                                        onDragLeave={() => dropZoneRef.current.classList.remove('dragover')}
                                    >
                                        <FontAwesomeIcon icon={faVideoCamera} className="mb-3 text-primary" size="4x" />
                                        <h4 className="mb-3">Drag and drop a file, or</h4>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Select File
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFiles(e.target.files)}
                                        />

                                        {/* Progress Section */}
                                        <div className="mt-4">
                                            <div className="progress mb-2" style={{ height: '20px' }}>
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: `${progress}%` }}
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    {progress.toFixed(0)}%
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-muted">{status}</span>
                                                <div className="d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faClock} className="me-2 text-secondary" />
                                                    <span className="text-muted">{estimatedTime} seconds remaining</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cloudinary Response */}
                                        {cloudinaryResponse && (
                                            <div className="cloudinary-response mt-4 p-3 bg-light border rounded">
                                                <strong>Cloudinary Response:</strong>
                                                <pre className="text-start text-break">{JSON.stringify(cloudinaryResponse, null, 2)}</pre>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <CustomButton
                                        text={status.includes('Uploading') ? 'Uploading...' : 'Submit'}
                                        disabled={status.includes('Uploading')}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div >
            <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Lecture added successfully.' />
        </DashboardLayout >
    );
}
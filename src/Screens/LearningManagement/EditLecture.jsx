import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { useGet, usePost } from "../../Api";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faClock, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const EditLecture = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        tagIds: []
    });
    const navigate = useNavigate();
    const { ApiData: AddCourseData, loading: AddCourseLoading, error: AddCourseError, post: GetAddCourse } = usePost(`lectures/create`);

    // Updated handleChange function to ensure updates happen correctly.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'tagIds' ? [Number(value)] : value, // Ensure `tagIds` is an array with a single number
        }));

        console.log('Updated formData:', formData);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData?.name && formData?.description) {
            GetAddCourse(formData);
        } else {
            alert("Please fill all the required fields.");
        }
    };

    useEffect(() => {
        if (AddCourseData) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/lecture-management');
            }, 3000);
        }
    }, [AddCourseData, navigate]);

    const [categories, setCategories] = useState([]);
    const { ApiData: CategoriesData, get: GetCategories } = useGet(`category`);

    useEffect(() => {
        GetCategories();
    }, []);

    useEffect(() => {
        if (CategoriesData) {
            setCategories(CategoriesData);
        }
    }, [CategoriesData]);

    const [tags, setTags] = useState([]);
    const { ApiData: TagsData, get: GetTags } = useGet(`tags`);

    useEffect(() => {
        GetTags();
    }, []);

    useEffect(() => {
        if (TagsData) {
            setTags(TagsData);
        }
    }, [TagsData]);

    const [courses, setCourses] = useState([]);
    const { ApiData: CourseData, get: GetCourse } = useGet(`courses`);

    useEffect(() => {
        GetCourse();
    }, []);

    useEffect(() => {
        if (CourseData) {
            setCourses(CourseData);
        }
    }, [CourseData]);

    // Video upload logic
    const chunkSize = 5 * 1024 * 1024; // 5 MB per chunk
    const maxConcurrentUploads = 4; // Max number of concurrent uploads
    const [progress, setProgress] = useState(0);
    const [uploadInfo, setUploadInfo] = useState('Upload Progress: 0%');
    const [isUploading, setIsUploading] = useState(false);

    const initiateUpload = async (file) => {
        if (!file) {
            alert('Please select a video file.');
            return;
        }

        const totalChunks = Math.ceil(file.size / chunkSize);
        setIsUploading(true);

        setProgress(0);
        setUploadInfo('Upload Progress: 0%');
        const chunkQueue = [];

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const chunkFormData = new FormData();
            chunkFormData.append('chunkIndex', chunkIndex);
            chunkFormData.append('totalChunks', totalChunks);
            chunkFormData.append('fileName', file.name);
            chunkFormData.append('file', chunk);

            const uploadTask = () =>
                uploadChunk(chunkFormData, chunkIndex, totalChunks);
            chunkQueue.push(uploadTask);
        }

        while (chunkQueue.length > 0) {
            const batch = chunkQueue.splice(0, maxConcurrentUploads);
            const batchPromises = batch.map((task) => task());
            await Promise.all(batchPromises);
        }
        setIsUploading(false);
    };

    const uploadChunk = async (chunkFormData, chunkIndex, totalChunks) => {
        try {
            const response = await fetch('https://devapi.archcitylms.com/lectures/upload', {
                method: 'POST',
                body: chunkFormData,
            });

            if (!response.ok) {
                throw new Error(`Chunk upload failed: ${response.status}`);
            }

            const result = await response.json();

            if (chunkIndex === totalChunks - 1) {
                // Only set the video URL when the last chunk is successfully uploaded
                setFormData((prevData) => ({
                    ...prevData,
                    videoUpload: result?.cloudinaryResponse?.secure_url,
                }));
            }

            updateProgress(chunkIndex, totalChunks);
        } catch (error) {
            console.error('Error uploading chunk:', error);
            setUploadInfo('Error uploading video chunk.');
        }
    };


    const updateProgress = (chunkIndex, totalChunks) => {
        const overallProgress = ((chunkIndex + 1) / totalChunks) * 100;
        setProgress(overallProgress);
        setUploadInfo(`Upload Progress: ${overallProgress.toFixed(2)}%`);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) initiateUpload(file);
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
                                    <div className="videoUploadBox">
                                        <label htmlFor="uploadData">
                                            <FontAwesomeIcon icon={faVideoCamera} />
                                            <span className="d-block">Video Upload</span>
                                        </label>
                                        <input
                                            type="file"
                                            id="uploadData"
                                            accept=".mp4"
                                            className="d-none"
                                            onChange={handleFileChange}
                                        />
                                        {isUploading && (
                                            <div>
                                                <div
                                                    className="bg-white"
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#f1f1f1',
                                                        borderRadius: '5px',
                                                        overflow: 'hidden',
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '10px',
                                                            width: `${progress}%`,
                                                            backgroundColor: '#4caf50',
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="uploadMeta mt-2">
                                                    <span>{uploadInfo}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                                <div className="col-md-12">
                                    <CustomButton
                                        variant="primaryButton"
                                        text={isUploading ? 'Uploading...' : 'Submit'}
                                        className={isUploading ? 'bg-light border text-dark' : ''}
                                        type="submit"
                                        disabled={isUploading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
            <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Lecture added successfully.' />
        </DashboardLayout>
    );
}
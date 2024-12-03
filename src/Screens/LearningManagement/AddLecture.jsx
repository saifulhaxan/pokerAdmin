/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 04/11/2024 - 23:01:33
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 04/11/2024
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
import { CategoryList, DietaryList, MenuList } from "../../Components/CategoryList";
import { useGet, usePost } from "../../Api";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faClockFour, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons/faVideoCamera";
export const AddLecture = () => {
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const { ApiData: AddCourseData, loading: AddCourseLoading, error: AddCourseError, post: GetAddCourse } = usePost(`lectures/upload`);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        GetAddCourse(formData);
        if (formData?.title && formData?.description) {
        }


    };


    useEffect(() => {
        if (AddCourseData) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 3000)
            navigate('/lecture-management');
        }
    }, [AddCourseData])


    const [categories, setCategories] = useState();
    const { ApiData: CategoriesData, loading: CategoriesLoading, error: CategoriesError, get: GetCategories } = useGet(`category`);

    useEffect(() => {
        GetCategories()
    }, [])

    useEffect(() => {
        if (CategoriesData) {
            setCategories(CategoriesData)
        }
    }, [CategoriesData])


    const [tags, setTags] = useState();
    const { ApiData: TagsData, loading: TagsLoading, error: TagsError, get: GetTags } = useGet(`tags`);

    useEffect(() => {
        GetTags()
    }, [])

    useEffect(() => {
        if (TagsData) {
            setTags(TagsData)
        }
    }, [TagsData])


    const [course, setCourse] = useState();
    const { ApiData: CourseData, loading: CourseLoading, error: CourseError, get: GetCourse } = useGet(`courses`);

    useEffect(() => {
        GetCourse()
    }, [])

    useEffect(() => {
        if (CourseData) {
            setCourse(CourseData)
        }
    }, [CourseData])


    // for lecture upload 


    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadInfo, setUploadInfo] = useState('0%');
    const [remainingTime, setRemainingTime] = useState(null);
    const clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    let eventSource = null;

    const chunkSize = 5 * 1024 * 1024; // 5 MB

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

    };


    useEffect(() => {
        if (file) {
            handleUpload()
            document.querySelector('.loaderBox').classList.remove("d-none");
        }
    }, [file])

    const [isUploading, setIsUploading] = useState(false); // Track upload status

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a video file to upload.');
            return;
        }

        const totalChunks = Math.ceil(file.size / chunkSize);
        const fileName = file.name;

        setProgress(0);
        setUploadInfo('Starting upload...');
        setRemainingTime(null);
        setIsUploading(true); // Disable the submit button

        const startTime = Date.now(); // Start timing the upload

        if (!eventSource) {
            eventSource = new EventSource('https://156.67.218.73:3030/lecture-upload/progress');
            eventSource.onmessage = (event) => {
                const progressData = JSON.parse(event.data);
                if (progressData.clientId === clientId) {
                    updateProgress(progressData.progress);
                }
            };
        }

        try {
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);

                const success = await uploadChunkWithRetry(chunk, chunkIndex, totalChunks, fileName, clientId);
                if (!success) {
                    alert(`Upload failed at chunk ${chunkIndex + 1}. Please try again.`);
                    setIsUploading(false); // Re-enable submit on error
                    return;
                }

                const elapsedTime = Date.now() - startTime;
                const avgChunkTime = elapsedTime / (chunkIndex + 1);
                const remainingChunks = totalChunks - (chunkIndex + 1);
                const estimatedRemainingTime = avgChunkTime * remainingChunks;

                updateProgress(((chunkIndex + 1) / totalChunks) * 100, estimatedRemainingTime);
            }

            setUploadInfo('Upload complete!');
        } catch (error) {
            console.error('Error during upload:', error);
            setUploadInfo('Upload failed. Please try again.');
        } finally {
            setIsUploading(false); // Re-enable the submit button
            if (eventSource) {
                eventSource.close();
                eventSource = null;
            }
        }
    };


    const uploadChunkWithRetry = async (chunk, chunkIndex, totalChunks, fileName, clientId, retries = 3) => {

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const formData = new FormData();
                formData.append('file', chunk);
                formData.append('chunkIndex', chunkIndex);
                formData.append('totalChunks', totalChunks);
                formData.append('fileName', fileName);
                formData.append('clientId', clientId);

                const response = await fetch('https://156.67.218.73:3030/lecture-upload/', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    document.querySelector('.loaderBox').classList.add("d-none");
                    throw new Error(`Failed to upload chunk ${chunkIndex + 1}`);
                }

                const result = await response.json();
                document.querySelector('.loaderBox').classList.add("d-none");
                if (result.success) {
                    setFormData({
                        ...formData,
                        videoUpload: result?.videoUrl
                    })
                    return true;
                } else {
                    throw new Error(result.error || `Unknown error for chunk ${chunkIndex + 1}`);
                }
            } catch (error) {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.error(`Error on attempt ${attempt + 1} for chunk ${chunkIndex + 1}:`, error);
            }
        }

        return false;
    };

    const updateProgress = (progressValue, estimatedTime) => {
        setProgress(progressValue);
        setUploadInfo(`${progressValue.toFixed(2)}%`);
        if (estimatedTime !== undefined) {
            setRemainingTime(estimatedTime);
        }
    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        return `${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, []);



    return (
        <>
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
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Add Lecture Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Lecture Name'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    value={formData.name}
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
                                                    value={formData.courseId}
                                                    option={course}
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
                                                    value={formData.categoryId}
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
                                                    required
                                                    value={formData?.tagIds}
                                                    option={tags}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <div className="videoUploadBox">
                                                    <label for="uploadData">
                                                        <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
                                                        <span className="d-block">Video Upload</span></label>
                                                    <input type="file" id="uploadData" accept=".mp4" className="d-none" onChange={handleFileChange} />


                                                    {remainingTime !== null && (
                                                        <>
                                                            <div style={{
                                                                width: '100%',
                                                                backgroundColor: 'rgb(255 255 255)',
                                                                borderRadius: '5px',
                                                                marginTop: '20px',
                                                                overflow: 'hidden',
                                                            }}>
                                                                <div
                                                                    style={{
                                                                        height: '10px',
                                                                        backgroundColor: '#4caf50',
                                                                        width: `${progress}%`,
                                                                        borderRadius: '5px',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <div className="uploadMeta">
                                                                <div style={{ marginTop: '10px' }}>{uploadInfo}</div>
                                                                <div style={{ marginTop: '10px' }}>
                                                                    <FontAwesomeIcon icon={faClockFour}></FontAwesomeIcon>{formatTime(remainingTime)}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-md-12 mb-4">
                                                <div className="inputWrapper">
                                                    <div className="form-controls">
                                                        <label htmlFor="">Description</label>
                                                        <textarea
                                                            name="description"
                                                            required
                                                            className="form-control shadow border-0"
                                                            id=""
                                                            cols="30"
                                                            rows="10"
                                                            value={formData.description}
                                                            onChange={handleChange}
                                                        >
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton
                                                    variant="primaryButton"
                                                    text={isUploading ? 'Uploading...' : 'Submit'}
                                                    className={isUploading ? 'bg-light border text-dark' : ''}
                                                    type="submit"
                                                    disabled={isUploading} // Disable while uploading
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Lecture Added Successfully.' />

            </DashboardLayout>
        </>
    );
};


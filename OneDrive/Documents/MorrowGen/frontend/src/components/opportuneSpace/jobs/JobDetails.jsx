import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jobData from "../../../assets/opportuneSpace/dataset_indeed-scraper-task-software-developer_2025-06-16_09-11-53-174.json";
import JobDetailsLayout from "./JobDetailsLayout";

const JobDetails = () => {
    const { jobId } = useParams();
    console.log(jobId);

    const job = jobData.find((item) => item.id === jobId);
    console.log(job);

    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center mt-10 items-start py-10 px-4">
            <JobDetailsLayout
                job={job}
                showFullDescription={showFullDescription}
                onToggleDescription={() => setShowFullDescription((prev) => !prev)}
            />
        </div>
    );
};

export default JobDetails;

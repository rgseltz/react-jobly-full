import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import SearchForm from "../forms/SearchForm";
const Jobs = () => {
    const [jobs, setJobs] = useState(null);
    useEffect(() => {
        getJobs();
    }, []
    );
    async function getJobs(title) {
        let jobs = await JoblyApi.getJobs(title)
        setJobs(jobs);
    }
    console.log(jobs);
    return (
        <div>
            <SearchForm search={getJobs} />
            {jobs && jobs.map(j =>
                <div key={j.id}><JobCard
                    id={j.id}
                    title={j.title}
                    companyName={j.companyName}
                    companyHandle={j.companyHandle}
                    salary={j.salary}
                    equity={j.equity}
                />
                </div>)}
        </div>
    )
}
export default Jobs;
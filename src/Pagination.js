import React, { useState } from "react";
import { Pagination as List } from "react-bootstrap";
const Pagination = ({ total, per_page = 10, pagination }) => {
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(per_page);
    let pages = Math.ceil(total / per_page);
    //if pages is not up to 0.5, push to 1 as well
    if (pages === 0 && total / per_page > 0) pages = 1;

    //Set array for all pages chips
    let pagesChip = [];
    for (let i = 1; i <= pages; i++) {
        pagesChip.push(i + 1);
    }

    const handlePageChange = (viewPage) => {
        //Only update the pagination if the page navigating to is different from the current page
        if (page !== viewPage) {
            //Get the start and end of the new page
            let newStart = viewPage * per_page - per_page; //eg page (1) * per_page(10) - per_page(10) = 0
            let newEnd = newStart + per_page;
            setStart(newStart + 1); //add one to new start so it starts from 1, 11, 21
            setPage(viewPage);
            if (newEnd > total) {
                setEnd(total);
            } else {
                setEnd(newEnd);
            }
            pagination(viewPage);
        }
    };

    const gotToPrevious = () => {
        let temp = page - 1;
        handlePageChange(temp);
    };
    const goToNext = () => {
        let temp = page + 1;
        handlePageChange(temp);
    };
    return (
        <div className="mt-3 d-flex justify-content-lg-between justify-content-md-between">
            <div>
                <h6>
                    Show {start} to {end > total ? total : end} of {total} entries
                </h6>
            </div>
            <div>
            <List>
                {page > 1 && <List Prev onClick={gotToPrevious} />}
               
                    {pagesChip.map((chip, idx) => (
                        <List.Item
                            key={idx}
                            onClick={() => handlePageChange(chip)}
                            style={{
                                backgroundColor: page === chip ? "#d10a11" : "#007bff",
                                color: page === chip ? "white" : "white",
                                fontSize: "15px",
                            }}
                        >
                            {chip}
                        </List.Item>
                    ))}
             
                {end < total && (
                    <List Next
                        onClick={goToNext}
                      
                    />
                       
                )}
                   </List>
            </div>
        </div>
    );
};

export default Pagination;

import React, { useEffect, useState, useContext } from 'react'
import './SearchResult.css'
import Loader from '../../components/Loader/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponseContext } from '../../context/responseContext';

function SearchResult() {
    const [response] = useContext(ResponseContext);

    const [gender, setGender] = useState("Any");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadData = () => {
        setLoading(false);
    }

    return (
        <div className="search__results">
            <h2 className="title">Search Results</h2>
            <div className="container">
                <div className="filter__results">
                    <p className="secondary__title">Filter Results</p>
                    <div className="eachFilter">
                        <p className="tertiary__title">Date</p>
                        <table>
                            <tr>
                                <td className="mr">From</td>
                                <td>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        minDate={new Date()}
                                        dateFormat="dd-MMM-yyyy" />
                                </td>
                            </tr>
                            <tr>
                                <td className="mr">To</td>
                                <td>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        minDate={new Date()}
                                        dateFormat="dd-MMM-yyyy" />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="eachFilter">
                        <p className="tertiary__title">Location</p>
                        <table>
                            <tr>
                                <td className="mr">From</td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td className="mr">To</td>
                                <td>

                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="eachFilter">
                        <p className="tertiary__title">Preferred Gender</p>
                        <table>
                            <tr>
                                <td className="mr">   </td>
                                <td>
                                    <select
                                        name="gender"
                                        required
                                        defaultValue={gender}
                                        onChange={(gender) => setGender(gender.target.value)}
                                    >
                                        <option value="Any">Any</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>

                </div>
                <div className="results">
                    {loading && <Loader />}
                    {response}
                </div>
            </div>
        </div>
    )
}

export default SearchResult

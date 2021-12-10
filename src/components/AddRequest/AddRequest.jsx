import React, { useContext, useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddRequest.css';
import currentLocationIcon from '../../img/currentLocationIcon.svg'
import destinationLocationIcon from '../../img/destinationLocationIcon.svg'
import addReqBg from '../../img/addReqBg.svg'
import dateIcon from '../../img/dateIcon.svg'
import { UserContext } from '../../context/userContext';
import SearchBox from '../SearchBox/SearchBox';
import wavesDesign from '../../img/wavesDesign.svg';
import plus from '../../img/plus.svg';
import minus from '../../img/minus.svg';
import { v4 as uuidv4 } from 'uuid';

// firebase
import { db } from '../../firebase/db';
import { collection, addDoc } from "firebase/firestore";

function AddRequest() {
    const [user] = useContext(UserContext);
    const [currentCity, setCurrentCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("Any");
    const [mode, setMode] = useState("Any");
    const [gender, setGender] = useState("Any");
    const [nop, setNop] = useState(1);
    const [description, setDescription] = useState("");

    const formValidation = () => {
        if (currentCity && destinationCity && date && time && gender && nop && mode)
            return true;
        else
            return false;
    }
    useEffect(() => {
        if (!user.authorized) {
            alert("login first")
        }
    }, [user.authorized])

    const makeDraft = (e) => {
        e.preventDefault();
        const draft = {
            currentCity,
            destinationCity,
            date,
            time,
            mode,
            gender,
            nop,
            description
        }
        localStorage.setItem('draft', JSON.stringify(draft));
    }

    const addRequest = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            if (window.confirm("Do yo want to continue?")) {
                setDate(date.setHours(0, 0, 0, 0));
                try {
                    await addDoc(collection(db, "rides"), {
                        currentCity,
                        destinationCity,
                        date,
                        time,
                        gender,
                        nop,
                        description,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        roomId: uuidv4(),
                        userId: user.uid
                    });
                    alert("Document written");
                    setDate(new Date())

                } catch (e) {
                    console.log("Error adding document: ", e);
                }
            }
        } else {
            alert("Please enter all the fields!");
        }
    }

    return (
        user.authorized ? (
            <>
                <div className="addReq__container" style={
                    {
                        background: `url(${addReqBg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "600px",
                        backgroundPosition: "95% 90%"
                    }
                } >
                    <div className="form__container">
                        <h2 className="title">Add Request</h2>
                        <table className="table__form">
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Traveling from </p>
                                    </td>
                                    <td>
                                        <SearchBox
                                            imgSrc={currentLocationIcon}
                                            inputName="currentLocation"
                                            selectedCity={currentCity}
                                            setSelectedCity={setCurrentCity} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Destination</p>
                                    </td>
                                    <td>
                                        <SearchBox
                                            imgSrc={destinationLocationIcon} inputName="destinationLocation"
                                            selectedCity={destinationCity}
                                            setSelectedCity={setDestinationCity} />

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Date</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <i className="text__icon">
                                                <img src={dateIcon} alt="locationIcon" />
                                            </i>
                                            <DatePicker
                                                selected={date}
                                                onChange={(date) => setDate(date)}
                                                minDate={new Date()}
                                                dateFormat="dd-MMM-yyyy" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Time</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <select
                                                name="time"
                                                required
                                                defaultValue={time}
                                                onChange={(time) => setTime(time.target.value)}
                                            >
                                                <option value="Any">Any</option>
                                                <option value="Morning">Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                                <option value="Night">Night</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Mode of Travel</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <select
                                                name="mode"
                                                required
                                                defaultValue={mode}
                                                onChange={(mode) => setMode(mode.target.value)}
                                            >
                                                <option value="Any">Any</option>
                                                <option value="Personal Car">Personal Car</option>
                                                <option value="Cab">Cab</option>
                                                <option value="Bus">Bus</option>
                                                <option value="Train">Train</option>
                                                <option value="Flight">Flight</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Your Gender</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <select
                                                name="gender"
                                                required
                                                defaultValue={gender}
                                                onChange={(gender) => setGender(gender.target.value)}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>No.of Passengers</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <input type="number" name="nop" min={1} value={nop}
                                                onChange={(e) => { setNop(e.target.value) }}
                                                required />
                                            <button className="text__icon">
                                                <img src={plus} alt="locationIcon"
                                                    onClick={() => setNop(nop + 1)} />
                                            </button>
                                            <button className="text__icon">
                                                <img src={minus} alt="locationIcon"
                                                    onClick={() => { if (nop - 1) setNop(nop - 1) }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Description</p>
                                    </td>
                                    <td>
                                        <div className="input__wrapper">
                                            <textarea
                                                name="description"
                                                cols="30"
                                                rows="5"
                                                value={description}
                                                onChange={(e) => { setDescription(e.target.value) }}></textarea>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <div className="buttons">
                                            <button className="btn blue__btn"
                                                onClick={addRequest}>Add Request</button>
                                            <button className="btn"
                                                onClick={makeDraft}>Draft</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div >
                </ div >
                <div className="wavesDesign"
                    style={{
                        background: `url(${wavesDesign})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        backgroundPosition: "center center"
                    }}
                ></div>
            </>) : (
            <div>Not authorized to search</div>
        )
    )
}

export default AddRequest
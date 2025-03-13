import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form(props) {
    const [btn, setBtn] = useState("Start Game");
    const [start, setStart] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setStart(true);
        setBtn("Lessgo");
        navigate('/game');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <button type="submit">{props.start}{btn}</button>
            </div>
           
        </form>
    );
}

export default Form;
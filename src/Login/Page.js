import { Outlet, Link } from "react-router-dom";

const Page = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/form">Contact</Link>
                    </li>
                    <li>
                        <Link to="/output">Output</Link>
                    </li>


                </ul>
            </nav>

            <Outlet />

        </>
    )
};

export default Page;

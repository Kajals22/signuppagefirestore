import React from "react";
import Page from "./Page";
import Form from "../Form";
// import Login from "./login";
import Table from "./Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Output from "./Output";
import Login from "./login";
export default function Layout() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="/" element={<Table />} />
                        <Route path="form" element={<Form />} />
                        <Route path="login" element={<Login />} />
                        <Route path="output" element={<Output />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

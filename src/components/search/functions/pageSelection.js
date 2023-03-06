import { setPage } from "../../../state/pagination/paginationSlices"
import { store } from "../../../state/store"
import React, { useEffect, useState,useRef} from "react";

export const selectPage = (e,page) => {

    store.dispatch(setPage(page))
    const page = useRef()
    console.log(page)
}
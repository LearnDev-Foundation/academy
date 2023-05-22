import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(username){

	const [getData, setData] = useState(null);

	useEffect(() => {
		axios.get(`https://vast-jade-shrimp-hem.cyclic.app/api/user/${username}`)
			.then(res => {
				setData(res.data);
			});
	}, []);

	if(!getData) return null;

	return getData;
}
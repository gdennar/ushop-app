import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchCollection = (collectionName) => {
	const [data, setData] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	const getCollection = () => {
		setisLoading(true);
		const cachedData = sessionStorage.getItem("myCachedData");
		if (!cachedData) {
			try {
				const docRef = collection(db, collectionName);
				const q = query(docRef, orderBy("createdAT", "desc"));

				onSnapshot(q, (querySnapshot) => {
					const allData = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					setData(allData);
					sessionStorage.setItem("myCachedData", JSON.stringify(allData));
					setisLoading(false);
				});
			} catch (error) {
				setisLoading(false);
				toast.error(error.message);
			}
		} else {
			setData(JSON.parse(cachedData));
			setisLoading(false);
		}
	};

	useEffect(() => {
		getCollection();
	}, []);

	return { data, isLoading };
};

export default useFetchCollection;

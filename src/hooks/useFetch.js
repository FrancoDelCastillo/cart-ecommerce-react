import {useState, useEffect} from "react"

export default function useFetch(url, options){
    // loading state is true by default
    const [ loading, setLoading ] = useState(true);
    const [ result, setResult ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await fetch(url, options);
                const json = await response.json();
                setLoading(false);
                setResult(json);
            } catch (err) {
                setLoading(false);
                setError(err);
            }

        })();
    },[url])

    return {loading, result, error};
}




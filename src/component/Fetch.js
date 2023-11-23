import { useEffect, useState } from "react";


    const Fetch = (url) => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => { 
        const abortCont = new AbortController();
 
        fetch(url, { signal: abortCont.signal })
        .then((response) => {
          if(!response.ok){
            // console.log('checking sever') tring checking response with data when it is ok
            throw Error("PLease Reload Page There's An Error Fetching API");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          if(error.name === 'AbortError'){
            console.log('no fetch')
          }else {
            setError(error.message);
            setLoading(false);
          }
        })

        return () => abortCont.abort();

      },[url])

      return { data , loading, error }

    }

    export default Fetch;

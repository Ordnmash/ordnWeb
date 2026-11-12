const URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080"
    : window.location.origin;

export async function getDetails(){
  try{
    const urlRes = await fetch(`${URL}/user/details`);
    if (urlRes.ok){
      const data = await urlRes.json();
      return data;
    }
    else{
      console.error("something wrong with the url response...");
    }
  }
  catch(err){
    console.error(err);
  }
}

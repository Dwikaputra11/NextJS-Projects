const page = async() => {

  const response = await fetch("http://localhost:3000/api/timer",{
    // cache: "no-cache", // no cache happen (default),
    // cache: "no-store", // fetch the resource every request
    cache: "force-cache", // cache the resource
    next:{
      // revalidate: false, // use cache everytime
      // revalidate: 0, // prevent the resource from being cached,
      revalidate: 10, // set cache lifetime until revalidate (in seconds)
      tags: ['timer'] // define tags when require to revalidate on-demand by using revalidateTag()
    }

  });
  const data= await response.json();

  return (
    <div>
      <h1>Nextjs Response (default) </h1>
      <p>Time: {data.readable}</p>
      <p>Request ID: {data.requestId}</p>
    </div>
  );
}

export default page;
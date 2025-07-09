export async function fetchProfile(setUser, setError,setMessage) {
  const token = localStorage.getItem("token");

  if (!token) {
    setError("You are not logged in.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/user/profile", {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      setMessage(data.message);
    } else {
      setError(data.message || "Failed to fetch profile");
    }
  } catch (err) {
    console.error(err);
    setError("An error occurred while fetching profile.");
  }
}
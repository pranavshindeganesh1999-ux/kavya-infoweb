 // Apply Now form script

 document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applyForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 🟢 Step 1: Collect all values
    const applyData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      education: document.getElementById("education").value,
      year: document.getElementById("year").value,
      position: document.getElementById("position").value,
      status: document.getElementById("status").value,
      address: document.getElementById("address").value,
    //   city: document.getElementById("city").value,
    //   state: document.getElementById("state").value,
    //   zip: document.getElementById("zip").value,
    //   message: document.getElementById("message").value
    };

    // ✅ Step 2: Console log data to verify
    console.log("🟢 Apply Form Data:", applyData);

    // 🟢 Step 3: Create FormData for file upload
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application has been saved successfully."
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message
        });
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Not Reachable",
        text: "Check if Node.js server is running."
      });
    }
  });
});

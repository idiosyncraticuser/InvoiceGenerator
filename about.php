<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us</title>
    <link rel="stylesheet" href="style.css">

    <style>
        .about-container {
            max-width: 900px;
            margin: 40px auto;
            padding: 30px 40px;
            background: #fff;
            border-radius: 8px;
            border-left: 6px solid #007bff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            line-height: 1.7;
        }
        .about-container h1, .about-container h2 {
            color: #007bff; 
            margin-bottom: 20px;
        }
        .about-container p span{
            color:#007bff;
            font-weight: 500;
        }
        .about-container h1 {
            color: #000000;
            text-align: center;
            margin-bottom: 40px;
        }
        .about-container p {
            color: #333;
            margin-bottom: 15px;
        }
        .values-list {
            list-style-type: none;
            padding-left: 0;
        }
        .values-list li {
            font-weight: 500;
            margin-bottom: 10px;
        }
        .values-list li strong {
            color: #007bff; 
        }
    </style>
</head>
<body>
    
<?php include 'header.php'; ?>

 <div class="about-container">
        <h1>About Kumawat Enterprises</h1>

        <h2>Powering Industries with Trust & Tech</h2>
        <p>
            For years, Kumawat Enterprises has been a cornerstone for industries seeking reliability and innovation. We are more than just a supplier; we are a dedicated partner committed to empowering your business with the highest quality components and state-of-the-art technological solutions. Our foundation is built on the two pillars that define us: the unwavering <span>Trust</span> of our clients and the advanced <span>Tech</span> that drives their success.
        </p>

        <h2>Our Story</h2>
        <p>
            Founded on a principle of integrity and a passion for progress, Kumawat Enterprises began with a simple mission: to bridge the gap between dependable, time-honored service and the cutting-edge technology that shapes modern industry. From our humble beginnings, we have grown into a leading provider, continuously expanding our expertise and product offerings to meet the evolving needs of our partners. Our journey is one of commitment—a commitment to quality, to our clients, and to the future of industry.
        </p>

        <h2>Our Mission & Values</h2>
        <p>
            Our mission is to ensure your operations run seamlessly by providing superior products backed by unparalleled support. We believe that true partnership is built on a foundation of strong values.
        </p>
        <ul class="values-list">
            <li><strong>Integrity:</strong> Conducting all our business with honesty and transparency. Your trust is our most valued asset.</li>
            <li><strong>Innovation:</strong> Constantly sourcing and developing the best technological solutions to give you a competitive edge.</li>
            <li><strong>Customer-Centricity:</strong> Placing our clients at the heart of everything we do. Your success is our ultimate metric.</li>
            <li><strong>Reliability:</strong> Delivering on our promises with consistency and precision. We provide products and services you can count on, every time.</li>
        </ul>

        <p>
            Thank you for taking the time to learn about us. We are proud of our heritage and excited for what the future holds. We invite you to explore our solutions or get in touch to discuss how we can help power your success.
        </p>
    </div>

<?php include 'footer.php'; ?>

    <script src="script.js"></script>
</body>

</html>

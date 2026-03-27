// Sample hostel data
const hostelsData = [
    {
        id: 1,
        name: "Sunshine Hostel",
        city: "mumbai",
        price: 4500,
        address: "123 Marine Drive, Mumbai",
        amenities: ["WiFi", "AC", "Laundry", "Kitchen", "Security"],
        description: "Comfortable hostel near the beach with modern facilities",
        available: true,
        rating: 4.5
    },
    {
        id: 2,
        name: "Student Haven",
        city: "delhi",
        price: 5000,
        address: "456 Connaught Place, Delhi",
        amenities: ["WiFi", "Gym", "Mess", "Study Room", "Security"],
        description: "Perfect for students with study facilities",
        available: true,
        rating: 4.3
    },
    {
        id: 3,
        name: "Tech Hub Hostel",
        city: "bangalore",
        price: 6000,
        address: "789 MG Road, Bangalore",
        amenities: ["WiFi", "AC", "Parking", "Cafeteria", "24/7 Security"],
        description: "Modern hostel in the heart of tech city",
        available: true,
        rating: 4.7
    },
    {
        id: 4,
        name: "Green Valley Hostel",
        city: "pune",
        price: 4000,
        address: "321 FC Road, Pune",
        amenities: ["WiFi", "Garden", "Kitchen", "Common Room", "Security"],
        description: "Peaceful hostel with garden area",
        available: true,
        rating: 4.2
    },
    {
        id: 5,
        name: "City Center Hostel",
        city: "mumbai",
        price: 5500,
        address: "567 Andheri West, Mumbai",
        amenities: ["WiFi", "AC", "Gym", "Laundry", "Security"],
        description: "Centrally located with all modern amenities",
        available: true,
        rating: 4.4
    },
    {
        id: 6,
        name: "Campus Hostel",
        city: "bangalore",
        price: 5200,
        address: "890 Koramangala, Bangalore",
        amenities: ["WiFi", "Mess", "Study Room", "Recreation", "Security"],
        description: "Close to major colleges and universities",
        available: true,
        rating: 4.6
    }
];

// Store in localStorage for easy access
if (typeof window !== 'undefined') {
    localStorage.setItem('hostelsData', JSON.stringify(hostelsData));
}

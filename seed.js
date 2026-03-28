const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('./models/Hostel');
const Admin = require('./models/Admin');

dotenv.config();

const hostels = [
  // MUMBAI
  { name: "Sunshine Hostel", city: "mumbai", price: 4500, address: "123 Marine Drive, Churchgate, Mumbai", amenities: ["WiFi", "AC", "Laundry", "Kitchen", "Security", "CCTV"], description: "Comfortable hostel steps from Marine Drive with sea breeze and modern facilities.", available: true, rating: 4.5 },
  { name: "City Center Hostel", city: "mumbai", price: 5500, address: "567 Andheri West, Mumbai", amenities: ["WiFi", "AC", "Gym", "Laundry", "Security", "Parking"], description: "Centrally located in Andheri with all modern amenities and metro access.", available: true, rating: 4.4 },
  { name: "Bandra Student House", city: "mumbai", price: 6500, address: "12 Hill Road, Bandra West, Mumbai", amenities: ["WiFi", "AC", "Mess", "Study Room", "Security", "Rooftop"], description: "Premium hostel in the heart of Bandra with rooftop lounge and study rooms.", available: true, rating: 4.7 },
  { name: "Dadar Budget Stay", city: "mumbai", price: 3800, address: "45 Dadar East, Mumbai", amenities: ["WiFi", "Kitchen", "Security", "Laundry"], description: "Affordable and clean hostel near Dadar railway station.", available: true, rating: 4.0 },

  // DELHI
  { name: "Student Haven Delhi", city: "delhi", price: 5000, address: "456 Connaught Place, New Delhi", amenities: ["WiFi", "Gym", "Mess", "Study Room", "Security", "AC"], description: "Perfect for students near Connaught Place with excellent study facilities.", available: true, rating: 4.3 },
  { name: "Karol Bagh Hostel", city: "delhi", price: 4200, address: "78 Karol Bagh, New Delhi", amenities: ["WiFi", "AC", "Kitchen", "Security", "Laundry"], description: "Budget-friendly hostel in the busy Karol Bagh market area.", available: true, rating: 4.1 },
  { name: "South Delhi Residency", city: "delhi", price: 7000, address: "22 Hauz Khas Village, South Delhi", amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Security", "Study Room", "Parking"], description: "Premium hostel in upscale Hauz Khas with all luxury amenities.", available: true, rating: 4.8 },
  { name: "Lajpat Nagar PG", city: "delhi", price: 4800, address: "33 Lajpat Nagar II, New Delhi", amenities: ["WiFi", "Mess", "Security", "AC", "Laundry"], description: "Well-connected hostel near Lajpat Nagar metro station.", available: true, rating: 4.2 },

  // BANGALORE
  { name: "Tech Hub Hostel", city: "bangalore", price: 6000, address: "789 MG Road, Bangalore", amenities: ["WiFi", "AC", "Parking", "Cafeteria", "24/7 Security", "Gym"], description: "Modern hostel in the heart of tech city, perfect for IT professionals.", available: true, rating: 4.7 },
  { name: "Campus Hostel Koramangala", city: "bangalore", price: 5200, address: "890 Koramangala 5th Block, Bangalore", amenities: ["WiFi", "Mess", "Study Room", "Recreation", "Security", "AC"], description: "Close to major colleges and tech parks in Koramangala.", available: true, rating: 4.6 },
  { name: "Indiranagar Student Hub", city: "bangalore", price: 7500, address: "14 100 Feet Road, Indiranagar, Bangalore", amenities: ["WiFi", "AC", "Gym", "Rooftop", "Security", "Cafeteria", "Parking"], description: "Trendy hostel in vibrant Indiranagar with rooftop hangout space.", available: true, rating: 4.9 },
  { name: "Whitefield Budget Inn", city: "bangalore", price: 4500, address: "56 Whitefield Main Road, Bangalore", amenities: ["WiFi", "Kitchen", "Security", "Laundry", "AC"], description: "Affordable stay near Whitefield IT corridor.", available: true, rating: 4.0 },

  // PUNE
  { name: "Green Valley Hostel", city: "pune", price: 4000, address: "321 FC Road, Shivajinagar, Pune", amenities: ["WiFi", "Garden", "Kitchen", "Common Room", "Security"], description: "Peaceful hostel with garden area near Fergusson College.", available: true, rating: 4.2 },
  { name: "Kothrud Student Home", city: "pune", price: 4800, address: "67 Kothrud, Pune", amenities: ["WiFi", "AC", "Mess", "Study Room", "Security", "Laundry"], description: "Popular among engineering students near Kothrud.", available: true, rating: 4.4 },
  { name: "Viman Nagar Residency", city: "pune", price: 6200, address: "89 Viman Nagar, Pune", amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Security", "Parking"], description: "Modern hostel near Pune airport and IT parks.", available: true, rating: 4.6 },

  // HYDERABAD
  { name: "Hitech City Hostel", city: "hyderabad", price: 5500, address: "12 Madhapur, Hitech City, Hyderabad", amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Security", "Parking"], description: "Premium hostel in the IT hub of Hyderabad.", available: true, rating: 4.6 },
  { name: "Ameerpet Student Stay", city: "hyderabad", price: 4000, address: "45 Ameerpet, Hyderabad", amenities: ["WiFi", "Mess", "Study Room", "Security", "AC"], description: "Ideal for students attending coaching institutes in Ameerpet.", available: true, rating: 4.2 },
  { name: "Banjara Hills Luxury PG", city: "hyderabad", price: 8000, address: "78 Road No. 12, Banjara Hills, Hyderabad", amenities: ["WiFi", "AC", "Gym", "Pool", "Security", "Cafeteria", "Parking"], description: "Luxury hostel in the posh Banjara Hills locality.", available: true, rating: 4.8 },

  // CHENNAI
  { name: "Anna Nagar Student Home", city: "chennai", price: 4500, address: "23 Anna Nagar West, Chennai", amenities: ["WiFi", "AC", "Mess", "Security", "Laundry"], description: "Well-maintained hostel in the residential Anna Nagar area.", available: true, rating: 4.3 },
  { name: "T Nagar Budget Hostel", city: "chennai", price: 3500, address: "56 T Nagar, Chennai", amenities: ["WiFi", "Kitchen", "Security", "Laundry"], description: "Affordable hostel near T Nagar shopping district.", available: true, rating: 4.0 },
  { name: "OMR Tech Hostel", city: "chennai", price: 5800, address: "90 Old Mahabalipuram Road, Chennai", amenities: ["WiFi", "AC", "Gym", "Cafeteria", "Security", "Parking"], description: "Modern hostel along the IT corridor of OMR.", available: true, rating: 4.5 },

  // KOLKATA
  { name: "Park Street Hostel", city: "kolkata", price: 3800, address: "34 Park Street, Kolkata", amenities: ["WiFi", "Mess", "Security", "Common Room", "Laundry"], description: "Classic hostel on the iconic Park Street.", available: true, rating: 4.1 },
  { name: "Salt Lake Student Hub", city: "kolkata", price: 4500, address: "67 Sector V, Salt Lake, Kolkata", amenities: ["WiFi", "AC", "Study Room", "Security", "Cafeteria"], description: "Modern hostel in the IT hub of Salt Lake.", available: true, rating: 4.4 },

  // JAIPUR
  { name: "Pink City Hostel", city: "jaipur", price: 3500, address: "12 MI Road, Jaipur", amenities: ["WiFi", "AC", "Kitchen", "Security", "Rooftop"], description: "Charming hostel with rooftop views of the Pink City.", available: true, rating: 4.3 },
  { name: "Malviya Nagar PG", city: "jaipur", price: 4200, address: "45 Malviya Nagar, Jaipur", amenities: ["WiFi", "Mess", "AC", "Security", "Laundry"], description: "Popular among students near Malviya National Institute of Technology.", available: true, rating: 4.2 },

  // AHMEDABAD
  { name: "SG Highway Hostel", city: "ahmedabad", price: 4800, address: "23 SG Highway, Ahmedabad", amenities: ["WiFi", "AC", "Gym", "Security", "Cafeteria"], description: "Modern hostel along the busy SG Highway.", available: true, rating: 4.4 },
  { name: "Navrangpura Student Stay", city: "ahmedabad", price: 3800, address: "56 Navrangpura, Ahmedabad", amenities: ["WiFi", "Mess", "Security", "Study Room", "AC"], description: "Affordable hostel near Gujarat University.", available: true, rating: 4.1 },

  // SURAT
  { name: "Diamond City Hostel", city: "surat", price: 3500, address: "34 Adajan, Surat", amenities: ["WiFi", "AC", "Kitchen", "Security", "Laundry"], description: "Clean and affordable hostel in the diamond city.", available: true, rating: 4.0 },
  { name: "Vesu Student Home", city: "surat", price: 4200, address: "78 Vesu, Surat", amenities: ["WiFi", "Mess", "AC", "Security", "Study Room"], description: "Comfortable hostel near SVNIT and other colleges.", available: true, rating: 4.3 }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Hostel.deleteMany({});
    await Admin.deleteMany({});

    await Hostel.insertMany(hostels);
    console.log(`✅ ${hostels.length} hostels seeded across 10 cities`);

    const admin = new Admin({ username: 'admin', password: 'admin123', email: 'admin@hostello.com' });
    await admin.save();
    console.log('✅ Admin created');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

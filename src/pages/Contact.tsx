
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have questions? We're here to help!</p>
      
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="subject">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Product Question">Product Question</option>
                <option value="Order Status">Order Status</option>
                <option value="Return Request">Return Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              ></textarea>
            </div>
            
            <Button 
              type="submit"
              className="bg-brand-blue hover:bg-brand-accent btn-hover-effect"
            >
              Send Message
            </Button>
          </form>
        </div>
        
        <div className="md:w-1/2 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-brand-blue mb-2">Address</h3>
              <p className="text-gray-600">
                1234 Tech Street<br />
                San Francisco, CA 94107<br />
                United States
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-brand-blue mb-2">Phone</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-brand-blue mb-2">Email</h3>
              <p className="text-gray-600">
                support@techtrove.com
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-brand-blue mb-2">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday: 9am - 6pm<br />
                Saturday: 10am - 4pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>
          
          <div className="mt-8 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

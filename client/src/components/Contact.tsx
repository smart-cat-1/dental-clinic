export default function Contact() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
        <p className="text-gray-600 leading-7">
          Monday - Friday: 9:00 AM - 6:00 PM
          <br />
          Saturday: 9:00 AM - 3:00 PM
          <br />
          Sunday: Closed
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Contact</h3>
        <p className="text-gray-600 leading-7">
          <a href="tel:+15405551212" className="text-blue-600 hover:text-blue-800">
            +1 (540) 555-1212
          </a>
          <br />
          <a href="mailto:support@dentalclinic.com" className="text-blue-600 hover:text-blue-800">
            support@dentalclinic.com
          </a>
          <br />
          1200 Healthcare Drive
          <br />
          Richmond, VA, 23220
        </p>
      </div>
    </div>
  );
}

import React,{useState} from 'react'

const Inquiry = () => {
    const [Inquiries, setInquiries] = useState([])
  return (
    <div className="row">
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">All Inquiries</h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle mb-0 table-hover table-centered">
              <thead className="bg-light-subtle">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {Inquiries.length > 0 ? (
                  Inquiries.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No Inquiry found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Inquiry

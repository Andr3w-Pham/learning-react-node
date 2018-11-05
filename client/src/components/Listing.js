// import React, { Component } from "react";
// import axios from "axios";
// class BlogsIndex extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       blogs: []
//     };
//   }

//     getBlogs() {
//     console.log("running did mount")
//     axios.get("/api/blogs")
//     .then(res => {
//       this.setState({ blogs: res.data });
//     })
//     .catch(err => console.log(err))
//   }

//   componentDidMount() {
//     this.getBlogs();
//   }

//   componentWillUpdate() {
//     this.getBlogs();
//   }
//   render() {
//     return (
//       <div className="card">
//             <h1> Listing Blogs</h1>
//         <div className="card-content">
//         <ul>
//           {this.state.blogs.map((blog, index) => {
//             return(
//               <div>
//                 <h3>{blog.title}</h3>
//                 <p>{blog.description}</p>
//               </div>
//             )
//           })}
//         </ul>
//         </div>
//       </div>
//     );
//   }
// }

// export default BlogsIndex;

import React, { Component } from "react";
import axios from "axios";
import Landing from "./Landing";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Modal from "react-modal";

class Listing extends Component {
  constructor() {
    super();
    this.state = {
      // when the modal or the pop up widow is closed set the flag modalisOpen to false
      modalIsOpen: false,
      // state variables title and description is created to keep track of the blog received from map method which can be passed to other methods in the class such as render, form, openmodal and closemodal
      title: "",
      description: ""
    };
  }

  openModal = (blog) => {
    this.setState({ 
      modalIsOpen: true,
       title: blog.title,
      description: blog.description,
      _id: blog._id
     });
   
  };

  closeModal = (blog) => {
    this.setState({
      modalIsOpen: false
    });
  };

  listItem = blogs => {
    return blogs.map(blog => (
      <div key={blog._id}>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
        {/* variable keeps track of the title and description that you see */}
        <button onClick={() => this.openModal(blog)}>Edit </button>
      </div>
    ));
  };

  handleEdit = e => {
    e.preventDefault();
    // create a variable that should be passed to the database
    var blog = {
      _id: this.state._id,
      title: this.state.title,
      description: this.state.description
    };
    console.log("blog data is fetched");
    console.log(blog);
    axios
      .put("/api/blogs/", blog)
      .then(response => {
        console.log(response.data);
        console.log("saved successfully");
        // this.props.handleNewBlog(response.data);
      })
      .catch(err => console.log(err));
      this.closeModal();
  };
  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  getBlogs() {
    console.log("Component Did mount");
    axios
      .get("/api/blogs")
      .then(response => {
        this.props.handleBlogs(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

    componentDidMount() {
    this.getBlogs();
  }

  componentWillUpdate() {
    this.getBlogs();
  }






  render() {
    console.log(this.props);
    console.log("render");
    return (
      <div className="container">
        <h1> Listing Blogs </h1>
        <div className="card">
          <div className="card-content">
            <div className="row">
              {/*// <ListItem blogs={this.props.blogs} />*/}
              {this.listItem(this.props.blogs)}
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
                contentLabel="Example Modal"
                className="Modal-open"
              >
                <form onSubmit={this.handleEdit} method="POST">
                  <label>Title</label>
                  <input
                    className="form-control"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.logChange}
                  />
                  <label>Description</label>
                  <input
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.logChange}
                  />
                  <button className="btn btn-uth-submit ">Submit</button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
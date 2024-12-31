import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Modal,
  Container,
} from "react-bootstrap";
import config from "../config";

const PixabaySearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  // Fetch images from Pixabay API
  const fetchImages = async () => {
    try {
        const response = await axios.get(
            `${config.pixabay.baseUrl}?key=${config.pixabay.apiKey}&q=${query}&page=${page}&per_page=6`
          );
      setImages(response.data.hits);
      setTotalPages(Math.ceil(response.data.totalHits / 6)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images when the page changes
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Generate pagination with ellipses
  const generatePagination = (currentPage, totalPages) => {
    const pagination = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pagination.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pagination.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pagination.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pagination;
  };

  return (
    <Container className="mt-4">
      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchImages();
          }}
        />
        <button className="btn btn-primary ms-2" onClick={() => fetchImages()}>
          Search
        </button>
      </div>

      {/* Image Grid */}
      <Row>
        {images.map((image) => (
          <Col md={4} sm={6} xs={12} key={image.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Header>
                <Card.Text>
                  {" "}
                  {image.tags} | {`${image.imageWidth} x ${image.imageHeight}`}
                </Card.Text>
              </Card.Header>
              <Card.Body className="p-0">
                <Card.Img
                  variant="top"
                  className="img-fluid"
                  style={{ width: "100%", objectFit: "cover" }}
                  src={image.webformatURL}
                />
              </Card.Body>

              <Card.Body>
                <Button
                  variant="primary"
                  onClick={() => setSelectedImage(image)}
                >
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          {/* Previous Button */}
          <Pagination.Prev
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          />

          {/* Page Numbers */}
          {generatePagination(page, totalPages).map((item, index) =>
            item === "..." ? (
              <Pagination.Ellipsis key={index} />
            ) : (
              <Pagination.Item
                key={index}
                active={item === page}
                onClick={() => setPage(item)}
              >
                {item}
              </Pagination.Item>
            )
          )}

          {/* Next Button */}
          <Pagination.Next
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          />
        </Pagination>
      )}

      {/* Modal for More Details */}
      {selectedImage && (
        <Modal show onHide={() => setSelectedImage(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Image Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Tags:</strong> {selectedImage.tags}
            </p>
            <p>
              <strong>User:</strong> {selectedImage.user}
            </p>
            <a
              href={selectedImage.pageURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Pixabay
            </a>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default PixabaySearch;

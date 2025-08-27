export default function handler(req, res) {
  const { id } = req.query;
  
  const imageUrls = {
    project1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    project2: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    project3: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
  };
  
  const imageUrl = imageUrls[id] || imageUrls.project1;
  res.redirect(302, imageUrl);
}
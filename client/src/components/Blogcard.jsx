
import { useNavigate } from 'react-router-dom';

const Blogcard = ({blog}) => {
    const {title, description, category, image, _id} = blog;
    const navigate =useNavigate();
  return (
    <div>
        <div
  onClick={() => navigate(`/blog/${_id}`)}
  className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer flex flex-col h-full"
>
  <img src={image} alt="" className="aspect-video" />

  <div className="flex flex-col h-full flex-1 p-5">
    <div className="space-y-2 flex flex-col flex-grow">
      {/* Category */}
      <span className="px-3 py-1 w-max bg-primary/20 rounded-full text-primary text-xs">
        {category}
      </span>

      {/* Title — fixed height */}
      <h5 className="font-medium text-gray-900 line-clamp-2 min-h-[3.5rem]">
        {title}
      </h5>

      {/* Paragraph — always starts at the same spot */}
      <p
        className="text-sm text-gray-600 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: description.slice(0,80) }}
      ></p>
    </div>

    {/* Optional space at bottom if needed */}
    <div className="mt-auto pt-4"></div>
  </div>
</div>


    </div>
  )
}

export default Blogcard

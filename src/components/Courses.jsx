import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import courses from "../data/courses";
import { useEffect, useState } from "react";

const SORT_KEYS = ["title", "slug", "id"];

function sortCourses(courses, key) {
  const sortedCourses = [...courses];
  if (!key || !SORT_KEYS.includes(key)) {
    return sortedCourses;
  }

  sortedCourses.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  return sortedCourses;
}

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search);
  const [sortKey, setSortKey] = useState(query.sort);
  const [sortedCourses, setSortedCourses] = useState(() =>
    sortCourses(courses, sortKey)
  );

  useEffect(() => {
    setSortedCourses(sortCourses(courses, sortKey));

    const newQuery = { ...query };
    if (sortKey) {
      newQuery.sort = sortKey;
    } else {
      delete newQuery.sort;
    }
    const newQueryString = queryString.stringify(newQuery);

    navigate(`${location.pathname}?${newQueryString}`);
  }, [sortKey]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortKey(value === "reset" ? undefined : value);
  };

  return (
    <>
      <h1>{sortKey ? `Courses sorted by ${sortKey}` : "Courses"}</h1>
      <p>Here you can choose the desired course!</p>
      <select value={sortKey || "reset"} onChange={handleSortChange}>
        <option value="reset">Reset Sorting</option>
        {SORT_KEYS.map((key) => (
          <option key={key} value={key}>
            Sort by {key}
          </option>
        ))}
      </select>
      {sortedCourses.map((course) => (
        <div className="courseContainer" key={course.id}>
          <Link className="courseLink" to={course.slug}>
            {course.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Courses;

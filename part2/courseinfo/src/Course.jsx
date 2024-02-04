const total = (courses) => {
  const total = [];
  courses.map((course) => total.push(course.exercises));
  return total.reduce((a, b) => a + b);
};

export const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => {
            return (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            );
          })}
          <h3>total of {total(course.parts)} exercises</h3>
          <br />
        </div>
      ))}
    </>
  );
};

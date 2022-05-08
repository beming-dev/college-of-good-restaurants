const CollegeRankItem = (props) => {
  return (
    <div className="college-rank-item">
      <span className="college-name">{props.collegeName}</span>
      <span className="student-num">{props.studentNum}</span>

      <style jsx>
        {`
          .college-rank-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 49px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 1px 1px grey;
            margin-bottom: 1px;
            span {
              padding: 0 50px;
              color: #e8630a;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CollegeRankItem;

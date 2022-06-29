import { useRouter } from "next/router";

type props = {
  collegeName: string;
  studentNum: number;
  collegeId: number;
};

const CollegeRankItem = (props: props) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/nearby-restaurant?id=${props.collegeId}`);
  };
  return (
    <div className="college-rank-item" onClick={onClick}>
      <span className="college-name">{props.collegeName}</span>
      <span className="student-num">{props.studentNum}</span>

      <style jsx>
        {`
          .college-rank-item:hover {
            background-color: #e8630a;
            cursor: pointer;
            span {
              color: white;
            }
          }
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
            transition-duration: 0.5s;
            span {
              padding: 0 50px;
              color: #e8630a;
            }
          }

          @media (max-width: 780px) {
            .college-rank-item {
              height: 45px;
            }
            .college-rank-item {
              span {
                padding: 0 40px;
                font-size: 15px;
              }
            }
          }
          @media (max-width: 545px) {
            .college-rank-item {
              height: 45px;
            }
          }

          @media (max-width: 480px) {
            .college-rank-item {
              height: 45px;
            }
            .college-rank-item {
              span {
                padding: 0 20px;
                font-size: 13px;
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default CollegeRankItem;

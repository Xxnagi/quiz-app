import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-3xl">QUIZZY</CardTitle>
        </CardHeader>
        <CardContent>
          <Link to="/quiz">
            <Button>START QUIZ</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
export default Home;

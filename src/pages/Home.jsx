import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebaseConfig";
const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="text-3xl">QUIZZY</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Link to="/quiz">
            <Button>START QUIZ</Button>
          </Link>

          <Button onClick={handleLogout} className="mt-4 w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

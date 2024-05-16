import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function WorkoutCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temp 1</CardTitle>
        <CardDescription>
          <div className="flex flex-row items-end justify-between">
            <div>Exercise 1, Exercise 2, ...</div>

            <div>
              <div>Previous</div>
              <div>01/01/2024</div>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

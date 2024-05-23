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
        <div className="flex cursor-pointer flex-row justify-between">
          <div>
            <CardTitle>Temp 1</CardTitle>
            <CardDescription>
              <div>
                <div>Exercise 1, Exercise 2, ...</div>
                <div>Previous 01/01/2024</div>
              </div>
            </CardDescription>
          </div>

          <div className="h-100 flex items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

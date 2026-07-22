import type {
  LearningGesture,
} from "../../types/signLanguage";

interface LearningPanelProps {
  lessons: LearningGesture[];
}

const LearningPanel = ({
  lessons,
}: LearningPanelProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        📚 Learn Sign Language
      </h2>

      <div className="space-y-5">

        {lessons.map((lesson) => (
          <div
            key={lesson.gesture}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  {lesson.gesture}
                </h3>

                <p className="text-sm text-gray-500">
                  {lesson.meaning}
                </p>

              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {lesson.difficulty}
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${lesson.progress}%`,
                }}
              />

            </div>

            <p className="mt-2 text-sm text-gray-600">
              Progress: {lesson.progress}%
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default LearningPanel;
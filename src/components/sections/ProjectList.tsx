import { WpProject, stripHtml, formatPrice } from '@/lib/wordpress';

export default function ProjectList({ projects }: { projects: WpProject[] }) {
  if (!projects.length) {
    return <p>No projects found</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="border p-4 rounded">

          <h2 className="text-lg font-semibold">
            {stripHtml(project.title?.rendered || '')}
          </h2>

          <p>{project.acf?.city}</p>

          <p className="text-sm text-gray-500">
            ₹ {formatPrice(project.acf?.starting_price)}
          </p>

        </div>
      ))}
    </div>
  );
}
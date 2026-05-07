import ProjectFilters from '@/components/sections/ProjectFilters';
import ProjectList from '@/components/sections/ProjectList';
import { getProjects } from '@/lib/wordpress';

type Props = {
  searchParams: {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    type?: string;
    status?: string;
  };
};

export default async function ProjectsPage({ searchParams }: Props) {
  const allProjects = await getProjects();

  // 🔥 Filter on server (important)
  const filtered = allProjects.filter((p) => {
    const acf = p.acf;

    if (searchParams.city && acf?.city !== searchParams.city) return false;

    if (searchParams.type && acf?.project_type !== searchParams.type)
      return false;

    if (searchParams.status && acf?.project_status !== searchParams.status)
      return false;

    if (
      searchParams.minPrice &&
      (acf?.starting_price || 0) < Number(searchParams.minPrice)
    )
      return false;

    if (
      searchParams.maxPrice &&
      (acf?.starting_price || 0) > Number(searchParams.maxPrice)
    )
      return false;

    return true;
  });

  return (
    <div className="grid grid-cols-4 gap-6 p-6">

      {/* Sidebar */}
      <div className="col-span-1">
        <ProjectFilters />
      </div>

      {/* Results */}
      <div className="col-span-3">
        <ProjectList projects={filtered} />
      </div>

    </div>
  );
}
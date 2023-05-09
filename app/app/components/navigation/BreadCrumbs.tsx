// define the Props
export type CrumbItem = {
  title: string;
  href: string;
};

export type BreadcrumbsProps = {
  items: CrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <>
      <div className="flex gap-2 items-start">
        {items &&
          items.map((crumb, i) => {
            const isLastItem = i === items.length - 1;
            return (
              <a
                key={i}
                href={crumb.href}
                className={`${
                  isLastItem ? "" : "hover:text-purple-800 hover:underline"
                }`}
              >
                {crumb.title}
                {!isLastItem && <span> / </span>}
              </a>
            );
          })}
      </div>
    </>
  );
};
export default Breadcrumbs;

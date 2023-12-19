import { useGlobalContext } from "@/Contexts/global-context";

export function Pagination({ searchParam }) {
    const { pagination, updateContacts } = useGlobalContext();

    const disableNextPage = pagination?.currentPage >= pagination?.lastPage;
    const disablePreviousPage = pagination?.currentPage <= 1;

    const onPreviusHandleClick = () => {
        if (disablePreviousPage) return;
        updateContacts(searchParam, pagination?.currentPage - 1);
    };

    const onNextHandleClick = () => {
        if (disableNextPage) return;
        updateContacts(searchParam, pagination?.currentPage + 1);
    };

    return (
        <div className="mt-10 border-t pt-5">
            <div className="flex flex-row justify-between">
                <button
                    onClick={onPreviusHandleClick}
                    className={disablePreviousPage && "text-slate-300"}
                >
                    {"<"} Anterior
                </button>
                <span className="font-bold">{pagination?.currentPage}</span>
                <button
                    onClick={onNextHandleClick}
                    className={disableNextPage && "text-slate-300"}
                >
                    Próxima {">"}
                </button>
            </div>
        </div>
    );
}

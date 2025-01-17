export default function Star({ size, className }: { size: number, className: string }) {
    return <svg className={className} width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.532 0L17.1868 9.87711L27.0639 13.532L17.1868 17.1868L13.532 27.0639L9.87711 17.1868L0 13.532L9.87711 9.87711L13.532 0Z"
            fill="#CFE1F4" />
    </svg>
}

type ImageWH = {
    width?: number | undefined;
    height?: number | undefined;
}

const Logo = ({width, height}: ImageWH) => {
    return (
        <div className="flex-center w-full">
            <img 
                src="/assets/images/logo.png"
                alt='logo'
                width={width}
                height={height}
            />
        </div>
    )
}

export default Logo

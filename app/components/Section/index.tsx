import { useState } from 'react';
import { SectionProps } from '~/components/Section/types';

const Section = (props: SectionProps) => {
	const { description, extra, points, borderColor, onHoverBackgroundColor, onHoverTextColor, width, height } = props;

	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const dynamicDivStyles = {
		borderColor: borderColor,
		backgroundColor: isHovered ? onHoverBackgroundColor : 'transparent',
		transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
		transform: isHovered ? 'scale(0.98)' : 'scale(1)',
		boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.25)' : '0 2px 5px rgba(0, 0, 0, 0.1)'
	};

	const dynamicTextStyles = { color: isHovered ? onHoverTextColor : '#f3f4f6', transition: 'color 0.3s ease' };

	const textStyle = " font-medium transition-opacity duration-300 ease-in-out hidden-hover";
	const containerStyle = "flex flex-col justify-center items-start p-3 border-2 m-1 border-dashed rounded-lg transition-colors duration-300"

	return (
		<div
			className={ `${containerStyle} ${width} ${height}` }
			style={ dynamicDivStyles }
			onMouseEnter={ handleMouseEnter }
			onMouseLeave={ handleMouseLeave }
		>
			{ description && (
				<p className={ `${ textStyle } text-xl font-bold` } style={ { color: onHoverTextColor } }>
					{ description }
				</p>
			)}
			{ extra && (
				<>
					<div className="mb-4"/>
					<p className={ `${ textStyle } text-md text-gray-100` } style={ dynamicTextStyles }>
						{ extra }
					</p>
				</>
			)}
			{ points && (
				<>
					<div className="mb-2"/>
					<ul className={ `${ textStyle } list-disc pl-4` } style={ dynamicTextStyles }>
						{ points.map((bulletPoint: any) => (
							<li key={ bulletPoint } className="mb-1 transition-transform duration-300 hover:translate-x-1">
								{ bulletPoint }
							</li>
						)) }
					</ul>
				</>
			)}
		</div>
	);
};

export default Section;

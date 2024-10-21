import { useMemo, useState } from 'react';
import { CarouselProps } from '~/components/Carousel/types';

const Carousel = (props: CarouselProps) => {
	const { images } = props;

	if (images.length === 0) {
		return null;
	}

	const [scrollIndex, setScrollIndex] = useState(1);

	const visibleCountPerRow = 3;
	const imageWidth = 95;
	const gapWidth = 8;
	const translateX = (scrollIndex - 1) * visibleCountPerRow * (imageWidth + gapWidth);

	const elements = useMemo(() => {
		let even: string[] = [];
		let odd: string[] = [];

		if (images.length <= visibleCountPerRow) {
			even = images;
			return { even, odd}
		}

		images.forEach((value, index) => {
			if (index % 2 === 0) {
				even.push(value);
			} else {
				odd.push(value);
			}
		});

		return {even, odd}
	}, images);

	const rows = elements.odd.length > 0 ? 2 : 1;

	const handleNext = () => {
		setScrollIndex((prevIndex) => prevIndex + 1);
	};

	const handlePrev = () => {
		setScrollIndex((prevIndex) => prevIndex - 1);
	};

	return (
		<div className="relative w-full">
			<div className="flex overflow-hidden">
				<div
					className={ `flex transition-transform duration-1000 gap-2` }
					style={ { transform: `translateX(-${ translateX }px)` } }
				>
					{ elements.even.map((image, index) => (
						<div key={ `even${index}` } className={ `w-[95px] h-[95px] object-cover` }>
							<img
								src={ image }
								alt={ `image${ index }` }
								className="w-full h-full rounded-xl"
							/>
						</div>
					)) }
				</div>
			</div>

			{ elements.odd.length > 0 && (
				<div className="flex overflow-hidden mt-2">
					<div
						className={ `flex transition-transform duration-1000 gap-2` }
						style={ { transform: `translateX(-${ translateX }px)` } }
					>
						{ elements.odd.map((image, index) => (
							<div key={ `odd${index}` } className={ `w-[95px] h-[95px] object-cover` }>
								<img
									src={ image }
									alt={ `image${ index }` }
									className="w-full h-full rounded-xl"
								/>
							</div>
						)) }
					</div>
				</div>
			)}

			{ scrollIndex > 1 && (
				<button
					onClick={ handlePrev }
					className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 bg-blue-400 text-white p-2 rounded-full"
				>
					&lt;
				</button>
			) }
			{ scrollIndex < (images.length / visibleCountPerRow) / rows && (
				<button
					onClick={ handleNext }
					className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 bg-blue-400 text-white p-2 rounded-full"
				>
					&gt;
				</button>
			) }
		</div>
	);
};

export default Carousel;

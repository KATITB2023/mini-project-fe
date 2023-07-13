/* eslint-disable react/no-unescaped-entities */
import {
	Box,
	Card,
	CardBody,
	CardHeader,
	Center,
	CloseButton,
	Flex,
	Grid,
	Heading,
	Input,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	Text,
	useDisclosure,
	useMediaQuery,
	useOutsideClick,
} from '@chakra-ui/react';
import {
	ArrowRightIcon,
	ChevronDownIcon,
	ExternalLinkIcon,
} from '@chakra-ui/icons';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

function cV(ref: MutableRefObject<HTMLInputElement>) {
	return ref.current.value;
}

function clear(ref: MutableRefObject<HTMLInputElement>) {
	ref.current.value = '';
}

export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		function setScrollVar() {
			const html = document.documentElement;
			const percentOfHS = html.scrollTop / html.clientHeight;
			html.style.setProperty(
				'--scrollVar',
				`${Math.min(100, percentOfHS * 100)}`
			);
			if (percentOfHS === 1) {
				onOpen();
			}
		}
		window.addEventListener('scroll', setScrollVar);
		window.addEventListener('resize', setScrollVar);
		setScrollVar();

		return setScrollVar();
	}, [onOpen]);

	const border: string = '#00a3ff 2px solid';
	const calcBut: (string | number)[] = [
		'shift',
		'alpha',
		'mode',
		'off',
		'on',
		'solve',
		'x!',
		'itgr',
		'd/dx',
		'convt',
		'root',
		'exp',
		'sqr',
		'log',
		'abs',
		'sin',
		'cos',
		'tan',
		'(',
		')',
		7,
		8,
		9,
		'del',
		'ca',
		4,
		5,
		6,
		'*',
		'/',
		1,
		2,
		3,
		'+',
		'-',
		0,
		'.',
		'pi',
		'ans',
		'=',
	];

	const functionalKey = [
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'0',
		'del',
		'=',
		'+',
		'-',
		'*',
		'/',
		'ca',
		'ans',
		'.',
		'pi',
		'on',
		'off',
		'(',
		')',
	];

	const pi = Math.PI;

	const [isLargerThan750] = useMediaQuery('(min-width: 750px)');

	const clickedRef = useRef<(HTMLDivElement | null)[]>([]);
	const displayRef = useRef() as MutableRefObject<HTMLInputElement>;
	const operatorRef = useRef() as MutableRefObject<HTMLInputElement>;
	const answerRef = useRef() as MutableRefObject<HTMLInputElement>;
	const gridRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [displayOnly, setDisplayOnly] = useState(false);
	const [answer, setAnswer] = useState(0);
	const [isError, setIsError] = useState(false);
	const [isOn, setIsOn] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isPop, setIsPop] = useState(false);
	const profileRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [who, setWho] = useState(false);
	const whoRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [about, setAbout] = useState(false);
	const aboutRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [contact, setContact] = useState(false);
	const contactRef = useRef() as MutableRefObject<HTMLDivElement>;

	useOutsideClick({
		ref: whoRef,
		handler: () => setWho(false),
	});
	useOutsideClick({
		ref: aboutRef,
		handler: () => setAbout(false),
	});
	useOutsideClick({
		ref: contactRef,
		handler: () => setContact(false),
	});
	useOutsideClick({
		ref: profileRef,
		handler: () => setIsPop(false),
	});

	function buttonClicked(ref: HTMLDivElement | null) {
		const content = ref?.innerHTML as string;

		if (!isOn) {
			if (content !== 'on') return;
			setIsOn(true);
		}

		if (isError) {
			clear(displayRef);
			clear(answerRef);
			clear(operatorRef);
			setIsError(false);
		}

		try {
			if (functionalKey.includes(content)) {
				if (content === 'off') {
					clear(displayRef);
					clear(operatorRef);
					clear(answerRef);
					setIsOn(false);
					return;
				}
				if (displayOnly) {
					setDisplayOnly(false);
					if (Number(content) || content === '0' || content === '.') {
						clear(answerRef);
						clear(operatorRef);
						displayRef.current.value = content;
					} else if (['+', '-', '*', '/'].includes(content)) {
						operatorRef.current.value = content;
						answerRef.current.value = `${answer}`;
						clear(displayRef);
					} else {
						clear(displayRef);
						clear(answerRef);
						clear(operatorRef);
					}
					return;
				}
				if (Number(content) || ['0', 'pi', '.', ')', '('].includes(content)) {
					if (content === 'pi') {
						displayRef.current.value = cV(displayRef).concat(`\u03C0`);
					} else {
						displayRef.current.value = cV(displayRef).concat(content);
					}
				} else if (['+', '-', '/', '*'].includes(content)) {
					answerRef.current.value =
						cV(answerRef) + ' ' + cV(operatorRef) + ' ' + cV(displayRef);
					operatorRef.current.value = content;
					clear(displayRef);
				} else {
					switch (content) {
						case 'ca':
							clear(displayRef);
							clear(answerRef);
							clear(operatorRef);
							break;
						case 'del':
							displayRef.current.value = cV(displayRef).slice(0, -1);
							break;
						case '=':
							if (
								cV(answerRef).split(' ').join('') &&
								cV(displayRef) &&
								cV(operatorRef)
							) {
								let curAns = cV(answerRef);
								answerRef.current.value =
									cV(answerRef) + ' ' + cV(operatorRef) + ' ' + cV(displayRef);
								displayRef.current.value = eval(
									curAns + cV(operatorRef) + cV(displayRef)
								);
								setAnswer(Number(cV(displayRef)));
								displayRef.current.value = '= ' + cV(displayRef);
								clear(operatorRef);
								setDisplayOnly(true);
								return;
							}
							setIsError(true);
							break;
						case 'ans':
							displayRef.current.value = `${answer}`;
							break;
					}
				}
			} else {
				displayRef.current.value = 'Maaf belum berfungsi hehe';
				setIsError(true);
			}
		} catch {
			displayRef.current.value = 'Input Error!';
			setIsError(true);
		}
	}

	return (
		<>
			<Head>
				<title>Scientific Calculator</title>
				<meta
					name='pr-1 buat fe'
					content='ya begitulah'
				/>
			</Head>
			<main className={poppins.className}>
				<Link
					href='https://github.com/KATITB2023/mini-project-fe/tree/feat/adi-information'
					target='_blank'
					top='1rem'
					right='1rem'
					position='fixed'
					display='flex'
					alignItems='center'
					zIndex={999}>
					Documentation
					<ExternalLinkIcon mx='.5rem' />
				</Link>
				<Box
					minH='100vh'
					paddingInline='clamp(3rem, 10vw, 6.25rem)'
					paddingBlock='clamp(5rem, 10vw, 6.25rem)'
					position='sticky'
					top={0}
					opacity='calc(100% - 1% * var(--scrollVar))'>
					<Box maxWidth='30ch'>
						<Heading
							as='h1'
							fontSize='clamp(2rem, 5vw, 6rem)'>
							Hello There!
						</Heading>
						<Heading
							as='h1'
							fontSize='clamp(1.5rem, 3vw, 4rem)'
							color='#9aabde'>
							Welcome to My Website
						</Heading>
					</Box>
					<Box
						position='absolute'
						cursor='pointer'
						top='70vh'
						onClick={() => {
							if (isLargerThan750) {
								setIsExpanded(true);
								return;
							}
							setIsPop(true);
						}}>
						<Heading
							fontSize='clamp(1.5rem, 3vw, 4rem)'
							animation='nyutnyut 1.5s infinite'>
							My Profile <ArrowRightIcon />
						</Heading>
					</Box>
					<Card
						ref={profileRef}
						display={isLargerThan750 ? 'none' : 'block'}
						backgroundColor='#2d3748'
						color='#eeeff1'
						position='absolute'
						inset={0}
						margin='auto'
						height='min-content'
						width='70%'
						transform={`scale(${isPop ? '1' : '0'})`}
						transition='300ms'
						zIndex={999}>
						<CardHeader>
							<Heading>My Profile</Heading>
						</CardHeader>
						<CardBody>
							<Stack
								divider={<StackDivider />}
								spacing={4}>
								<Text
									onClick={() => {
										setWho(true);
										setIsPop(false);
									}}>
									Who?
								</Text>
								<Text
									onClick={() => {
										setAbout(true);
										setIsPop(false);
									}}>
									About
								</Text>
								<Text
									onClick={() => {
										setContact(true);
										setIsPop(false);
									}}>
									Contact Me
								</Text>
							</Stack>
						</CardBody>
					</Card>
					<Box
						position='fixed'
						top='0'
						left={0}
						width='100%'
						height='100%'
						display={who || about || contact || isPop ? 'block' : 'none'}>
						<div
							style={{
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								zIndex: 100,
								backgroundColor: 'rgba(0, 0, 0, .4)',
							}}></div>
					</Box>
				</Box>
				<Box>
					<Box
						width={isExpanded ? '100%' : '50%'}
						maxHeight='100vh'
						height='100vh'
						position='absolute'
						right={0}
						top={0}
						display={isLargerThan750 ? 'block' : 'none'}
						transition='300ms'
						backgroundImage='linear-gradient(to right, #172b4d, #455667)'
						opacity='calc(100% - 1% * min(var(--scrollVar), 50) * 100 / 50)'>
						<CloseButton
							margin='.5rem'
							size='lg'
							onClick={() => {
								setIsExpanded(false);
							}}
							opacity={isExpanded ? '100%' : '0'}
							cursor={isExpanded ? 'pointer' : 'default'}
							transition='100ms'
						/>
					</Box>
					<Center
						borderRadius='50%'
						height='clamp(7rem, 12vw, 10rem)'
						backgroundColor='#172b4d'
						aspectRatio={1 / 1}
						cursor='pointer'
						position='absolute'
						transform='translate(0, calc(-1px * var(--scrollVar)))'
						display={isLargerThan750 ? 'flex' : 'none'}
						top={isExpanded ? '38vh' : '7.5vh'}
						right={isExpanded ? '65vw' : '10vw'}
						border={border}
						boxShadow='10px 10px 15px rgb(0, 0, 0, .5)'
						_hover={{
							boxShadow: '4px 4px 9px rgb(0, 0, 0, .5)',
							transform: 'translate(6px, 6px)',
						}}
						transition='200ms'
						onClick={() => {
							setWho(true);
						}}>
						<Heading fontSize='clamp(1rem, 3vw, 2rem)'>Who?</Heading>
					</Center>
					<Center
						borderRadius='50%'
						height='clamp(7rem, 12vw, 10rem)'
						backgroundColor='#172b4d'
						display={isLargerThan750 ? 'flex' : 'none'}
						aspectRatio={1 / 1}
						cursor='pointer'
						position='absolute'
						transform='translate(0, calc(-3px * var(--scrollVar)))'
						top={isExpanded ? '38vh' : '20rem'}
						right={isExpanded ? '44vw' : '25vw'}
						border={border}
						boxShadow='10px 10px 15px rgb(0, 0, 0, .5)'
						_hover={{
							boxShadow: '4px 4px 9px rgb(0, 0, 0, .5)',
							transform: 'translate(6px, 6px)',
						}}
						transition='200ms'
						onClick={() => {
							setAbout(true);
						}}>
						<Heading fontSize='clamp(1rem, 3vw, 2rem)'>About</Heading>
					</Center>
					<Center
						borderRadius='50%'
						height='clamp(7rem, 12vw, 10rem)'
						backgroundColor='#172b4d'
						display={isLargerThan750 ? 'flex' : 'none'}
						aspectRatio={1 / 1}
						cursor='pointer'
						position='absolute'
						transform='translate(0, calc(-5px * var(--scrollVar)))'
						top={isExpanded ? '38vh' : '35rem'}
						right={isExpanded ? '23vw' : '10vw'}
						border={border}
						boxShadow='10px 10px 15px rgb(0, 0, 0, .5)'
						_hover={{
							boxShadow: '4px 4px 9px rgb(0, 0, 0, .5)',
							transform: 'translate(6px, 6px)',
						}}
						transition='200ms'
						onClick={() => {
							setContact(true);
						}}>
						<Heading fontSize='clamp(1rem, 3vw, 2rem)'>Contact</Heading>
					</Center>
				</Box>
				<Box
					ref={whoRef}
					position='absolute'
					top='25%'
					left='50%'
					transform={`translate(-50%, -50%) scale(${who ? '1' : '0'})`}
					width='50%'
					opacity={who ? '100%' : '0'}
					overflow='hidden'
					height='22.5rem'
					borderRadius={who ? 'none' : '50%'}
					transition='250ms'
					zIndex={999}>
					<Card
						backgroundColor='#2d3748'
						color='#eeeff1'
						height='22.5rem'>
						<CardHeader>
							<Heading>It's Me!</Heading>
						</CardHeader>
						<CardBody>
							<Stack
								divider={<StackDivider />}
								spacing={4}>
								<Box>
									<Heading size='md'>NAME</Heading>
									<Text pt={2}>Adi Haditya Nursyam</Text>
								</Box>
								<Box>
									<Heading size='md'>NIM</Heading>
									<Text pt={2}>16922204</Text>
								</Box>
								<Box>
									<Heading size='md'>MAJOR</Heading>
									<Text pt={2}>Mechanical Engineering 22</Text>
								</Box>
							</Stack>
						</CardBody>
					</Card>
				</Box>
				<Box
					ref={aboutRef}
					position='absolute'
					top='25%'
					left='50%'
					transform={`translate(-50%, -50%) scale(${about ? '1' : '0'})`}
					width='50%'
					opacity={about ? '100%' : '0'}
					overflow='hidden'
					height='22.5rem'
					borderRadius={about ? 'none' : '50%'}
					transition='250ms'
					zIndex={999}>
					<Card
						backgroundColor='#2d3748'
						color='#eeeff1'
						height='22.5rem'>
						<CardHeader>
							<Heading>About Me!</Heading>
						</CardHeader>
						<CardBody>
							<Stack
								divider={<StackDivider />}
								spacing={4}>
								<Box>
									<Heading size='md'>ADRESS</Heading>
									<Text pt={2}>Sangkuriang Street</Text>
								</Box>
								<Box>
									<Heading size='md'>HEIGHT</Heading>
									<Text pt={2}>174cm</Text>
								</Box>
								<Box>
									<Heading size='md'>HOBBY?</Heading>
									<Text pt={2}>Doing Nothing</Text>
								</Box>
							</Stack>
						</CardBody>
					</Card>
				</Box>
				<Box
					ref={contactRef}
					position='absolute'
					top='25%'
					left='50%'
					transform={`translate(-50%, -50%) scale(${contact ? '1' : '0'})`}
					width='50%'
					opacity={contact ? '100%' : '0'}
					overflow='hidden'
					height='22.5rem'
					borderRadius={contact ? 'none' : '50%'}
					transition='250ms ease-in-out'
					zIndex={999}>
					<Card
						backgroundColor='#2d3748'
						color='#eeeff1'
						height='22.5rem'>
						<CardHeader>
							<Heading>Contact Me!</Heading>
						</CardHeader>
						<CardBody>
							<Stack
								divider={<StackDivider />}
								spacing={4}>
								<Box>
									<Heading size='md'>INSTAGRAM</Heading>
									<Text pt={2}>
										<Link
											href='https://www.instagram.com/adihnursyam/'
											target='_blank'
											display='flex'
											alignItems='center'>
											adihnursyam <ExternalLinkIcon mx='.5rem' />
										</Link>
									</Text>
								</Box>
								<Box>
									<Heading size='md'>TWITTER</Heading>
									<Text pt={2}>
										<Link
											href='https://twitter.com/soezyxsttt'
											target='_blank'
											display='flex'
											alignItems='center'>
											soezyxsttt <ExternalLinkIcon mx='.5rem' />
										</Link>
									</Text>
								</Box>
								<Box>
									<Heading size='md'>LINE</Heading>
									<Text pt={2}>
										<Link
											href='https://line.me/ti/p/z9213lQ1s7'
											target='_blank'
											display='flex'
											alignItems='center'>
											soezyxst <ExternalLinkIcon mx='.5rem' />
										</Link>
									</Text>
								</Box>
							</Stack>
						</CardBody>
					</Card>
				</Box>
				<Link href='#calculator'>
					<ChevronDownIcon
						fontSize='clamp(2rem, 4vw, 4rem)'
						position='fixed'
						bottom={0}
						left='50%'
						transform='translateX(-50%)'
						opacity='calc(100% - 1% * min(var(--scrollVar), 30) * 100 / 30)'
						animation='atasbawah 1.5s infinite'
						cursor='pointer'
					/>
				</Link>
				<Center
					minH='100vh'
					id='calculator'>
					<Flex flexDirection='column'>
						<Heading
							as='h1'
							paddingInline='.5rem'
							paddingBlock='1rem'>
							Scientific Calculator
						</Heading>
						<Flex
							height='75vh'
							minW='20rem'
							w='60vw'
							maxW='27.5rem'
							border={border}
							borderRadius='1.5rem'
							padding='1rem 1.5rem'
							gap='1.5rem'
							flexDirection='column'>
							<Grid
								ref={gridRef}
								height='25%'
								border={border}
								borderColor={isError ? 'red' : '#00a3ff'}
								borderRadius='.5rem'
								gridAutoRows='repeat(3, 1fr)'>
								<Input
									readOnly
									ref={answerRef}
									textAlign='end'
									height='auto'
									border='none'
									fontSize={{ base: '1rem', md: '1.125rem' }}
								/>
								<Input
									readOnly
									ref={operatorRef}
									textAlign='end'
									height='auto'
									border='none'
									fontSize={{ base: '1rem', md: '1.125rem' }}
								/>
								<Input
									readOnly
									ref={displayRef}
									placeholder={isOn ? 'Input Number Here' : 'OFF'}
									textAlign='end'
									height='auto'
									border='none'
									fontSize={{ base: '1rem', md: '1.125rem' }}
								/>
							</Grid>
							<Grid
								templateColumns='repeat(5, 1fr)'
								templateRows='repeat(8, 1fr)'
								gap='.75rem'
								flexGrow={1}>
								{calcBut.map((item: string | number, index: number) => (
									<Center
										key={index}
										ref={(el) => (clickedRef.current[index] = el)}
										border={border}
										borderRadius='.5rem'
										textTransform='uppercase'
										cursor='pointer'
										transition='200ms'
										fontSize={{ base: '.625rem', md: '.8rem', xl: '1rem' }}
										onClick={() => {
											buttonClicked(clickedRef.current[index]);
										}}
										_hover={{
											background: '#2a5bfcfa',
										}}>
										{item}
									</Center>
								))}
							</Grid>
						</Flex>
					</Flex>
				</Center>
				<Modal
					isOpen={isOpen}
					onClose={onClose}>
					<ModalOverlay />
					<ModalContent color='black'>
						<ModalHeader>Notes:</ModalHeader>
						<ModalCloseButton />
						<ModalBody marginBottom='.5rem'>
							Beberapa tombol masih belum berfungsi, maklumlah ya, hehe.
						</ModalBody>
					</ModalContent>
				</Modal>
			</main>
		</>
	);
}

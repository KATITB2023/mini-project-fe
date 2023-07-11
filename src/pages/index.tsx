import {
	Center,
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
	useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
		onOpen();
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

	const clickedRef = useRef<(HTMLDivElement | null)[]>([]);
	const displayRef = useRef() as MutableRefObject<HTMLInputElement>;
	const operatorRef = useRef() as MutableRefObject<HTMLInputElement>;
	const answerRef = useRef() as MutableRefObject<HTMLInputElement>;
	const gridRef = useRef() as MutableRefObject<HTMLDivElement>;
	const [displayOnly, setDisplayOnly] = useState<boolean>(false);
	const [answer, setAnswer] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);
	const [isOn, setIsOn] = useState<boolean>(true);

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
              if (cV(answerRef).split(' ').join('') && cV(displayRef) && cV(operatorRef)) {
                let curAns = cV(answerRef)
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
				<Center minH='100vh'>
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
				<Link
					href='https://github.com/KATITB2023/mini-project-fe/tree/feat/adi-information'
					target='_blank'
					position='absolute'
					top='1rem'
					left='1rem'
					display='flex'
					alignItems='center'>
					Documentation
					<ExternalLinkIcon mx='.5rem' />
				</Link>
			</main>
		</>
	);
}

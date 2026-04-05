export const CURRICULUM = {
	JSS: {
		'English Language': [
			'Grammar & Language Use',
			'Comprehension & Summary',
			'Composition & Writing',
			'Literature & Oral Forms'
		],
		Mathematics: [
			'Number & Numeration',
			'Basic Operations & Algebra',
			'Geometry & Mensuration',
			'Statistics & Probability'
		],
		'Basic Science & Technology': [
			'Living Things & Environment',
			'Physical & Chemical Processes',
			'Energy & Forces',
			'Technology & Society'
		],
		'Social Studies': [
			'Family & Community',
			'Citizenship & Government',
			'Nigeria & Geography',
			'Culture & Values'
		],
		'Civic Education': ['Citizenship', 'Government & Democracy', 'Social Issues'],
		'Cultural & Creative Arts': ['Visual Arts', 'Music', 'Drama & Dance'],
		'Physical & Health Education': ['Physical Education', 'Health Education'],
		'Home Economics': ['Food & Nutrition', 'Clothing & Textiles', 'Home Management'],
		'Agricultural Science': [
			'Introduction to Agriculture',
			'Soil Science',
			'Crop Production',
			'Animal Production'
		],
		'Business Studies': ['Office Practice', 'Commerce', 'Keyboarding', 'Bookkeeping'],
		'Computer Studies / ICT': [
			'Computer Fundamentals',
			'Operating System & Applications',
			'Internet & Communication',
			'Programming Concepts'
		],
		'French Language': ['Oral Communication', 'Grammar', 'Reading & Writing'],
		'Yoruba Language': ['Oral & Listening Skills', 'Grammar', 'Composition & Literature'],
		'Hausa Language': ['Oral Literature & Communication', 'Grammar', 'Writing & Literature'],
		'Igbo Language': ['Oral Literature', 'Grammar', 'Composition & Literature']
	},
	SSS: {
		'English Language': [
			'Comprehension',
			'Summary Writing',
			'Lexis & Structure',
			'Oral English / Phonology',
			'Essay Writing',
			'Literature-in-English'
		],
		Mathematics: [
			'Number & Numeration',
			'Algebra',
			'Geometry & Trigonometry',
			'Calculus',
			'Statistics & Probability',
			'Vectors & Matrices'
		],
		Physics: [
			'Mechanics',
			'Thermal Physics',
			'Waves & Optics',
			'Electricity & Magnetism',
			'Modern Physics'
		],
		Chemistry: [
			'Atomic Structure & Periodic Table',
			'States of Matter & Kinetic Theory',
			'Chemical Reactions & Energetics',
			'Inorganic Chemistry',
			'Organic Chemistry'
		],
		Biology: [
			'Cell Biology',
			'Classification of Living Things',
			'Plant Biology',
			'Animal Biology & Physiology',
			'Ecology & Environment',
			'Genetics & Evolution'
		],
		'Further Mathematics': ['Pure Mathematics', 'Statistics & Probability', 'Mechanics'],
		Geography: [
			'Physical Geography',
			'Human & Economic Geography',
			'Regional Geography — Nigeria & Africa',
			'Map Reading & Field Work'
		],
		Economics: [
			'Microeconomics',
			'Macroeconomics',
			'International Trade & Finance',
			'Nigerian Economy'
		],
		'Financial Accounting': [
			'Bookkeeping Fundamentals',
			'Financial Statements',
			'Special Accounts & Organisations',
			'Costing'
		],
		Commerce: [
			'Trade & Distribution',
			'Commercial Documents',
			'Banking & Finance',
			'Business Organisations'
		],
		Government: [
			'Basic Concepts',
			'Political Institutions',
			'Nigerian Government & Politics',
			'International Relations'
		],
		History: [
			'Pre-Colonial Nigeria',
			'Colonial Nigeria',
			'Post-Colonial Nigeria & Africa',
			'World History'
		],
		'Literature in English': ['Prose', 'Poetry', 'Drama', 'Prescribed Texts'],
		'Christian Religious Studies': ['Old Testament', 'New Testament', 'Christian Ethics & Living'],
		'Islamic Religious Studies': [
			"Qur'an & Hadith",
			'Islamic History',
			'Islamic Jurisprudence & Practice'
		],
		'Agricultural Science': [
			'Soil Science',
			'Crop Production',
			'Animal Production',
			'Agricultural Economics & Extension'
		],
		'Technical Drawing': [
			'Plane Geometry',
			'Orthographic Projection',
			'Isometric & Pictorial Drawing',
			'Building Drawing'
		],
		'Computer Science': [
			'Computer Hardware & Software',
			'Data & Information Processing',
			'Programming & Algorithms',
			'Networking & Internet'
		],
		'Fine Arts': [
			'Art Theory & Appreciation',
			'Drawing & Painting',
			'Sculpture & Ceramics',
			'Graphics & Crafts'
		],
		Music: ['Music Theory', 'History & Appreciation', 'Performance & Composition'],
		'French Language': [
			'Oral Communication & Listening',
			'Grammar (Advanced)',
			'Reading & Comprehension',
			'Written Expression'
		],
		'Home Economics': [
			'Food & Nutrition (Advanced)',
			'Clothing & Textiles (Advanced)',
			'Child Development & Care',
			'Home Management & Consumer Education'
		]
	}
};

export type Level = keyof typeof CURRICULUM;
export type Subject<L extends Level> = keyof (typeof CURRICULUM)[L];

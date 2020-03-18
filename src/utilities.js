//

//

export function collectIdsAndDocs( doc ) {
	return { ...doc.data(), id: doc.id };
}


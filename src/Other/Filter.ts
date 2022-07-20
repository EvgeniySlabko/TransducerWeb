/*
export function ComputeDenCoeffs(FilterOrder: number, Lcutoff: number, Ucutoff: number) : number[]
{
	let k: number;            // loop variables
	let theta: number;     // Math.PI * (Ucutoff - Lcutoff) / 2.0
	let cp : number;        // cosine of phi
	let st: number;        // sine of theta
	let ct : number;        // cosine of theta
	let s2t : number;       // sine of 2*theta
	let c2t: number;       // cosine 0f 2*theta
	let RCoeffs = new Array<number>(2 * FilterOrder);       // z^-2 coefficients 
	let TCoeffs= new Array<number>(2 * FilterOrder);        // z^-1 coefficients
	let DenomCoeffs = new Array<number>();                    // dk coefficients
	let PoleAngle : number;                                 // pole angle
	let SinPoleAngle : number;                              // sine of pole angle
	let CosPoleAngle : number;                              // cosine of pole angle
	let a: number;                                          // workspace variables

	cp = Math.cos(Math.PI * (Ucutoff + Lcutoff) / 2.0);
	theta = Math.PI * (Ucutoff - Lcutoff) / 2.0;
	st = Math.sin(theta);
	ct = Math.cos(theta);
	s2t = 2.0*st*ct;        // sine of 2*theta
	c2t = 2.0*ct*ct - 1.0;  // cosine of 2*theta

	for (k = 0; k < FilterOrder; ++k)
	{
		PoleAngle = Math.PI * (2 * k + 1) / (2 * FilterOrder);
		SinPoleAngle = Math.sin(PoleAngle);
		CosPoleAngle = Math.cos(PoleAngle);
		a = 1.0 + s2t*SinPoleAngle;
		RCoeffs[2 * k] = c2t / a;
		RCoeffs[2 * k + 1] = s2t*CosPoleAngle / a;
		TCoeffs[2 * k] = -2.0*cp*(ct + st*SinPoleAngle) / a;
		TCoeffs[2 * k + 1] = -2.0*cp*st*CosPoleAngle / a;
	}

	DenomCoeffs = TrinomialMultiply(FilterOrder, TCoeffs, RCoeffs);

	DenomCoeffs[1] = DenomCoeffs[0];
	DenomCoeffs[0] = 1.0;
	for (k = 3; k <= 2 * FilterOrder; ++k)
		DenomCoeffs[k] = DenomCoeffs[2 * k - 2];

	for (let i = DenomCoeffs.length - 1; i > FilterOrder * 2 + 1; i--)
		DenomCoeffs.pop();

	return DenomCoeffs;
}

export function TrinomialMultiply(FilterOrder: number, b : number[], c: number[]) : number[]
{
	let i;
	let j;
	let s = Math.floor(FilterOrder * 4);
	let RetVal = new Array<number>(FilterOrder * 4);
	RetVal.fill(0.0);

	RetVal[2] = c[0];
	RetVal[3] = c[1];
	RetVal[0] = b[0];
	RetVal[1] = b[1];

	for (i = 1; i < FilterOrder; ++i)
	{
		RetVal[2 * (2 * i + 1)] += c[2 * i] * RetVal[2 * (2 * i - 1)] - c[2 * i + 1] * RetVal[2 * (2 * i - 1) + 1];
		RetVal[2 * (2 * i + 1) + 1] += c[2 * i] * RetVal[2 * (2 * i - 1) + 1] + c[2 * i + 1] * RetVal[2 * (2 * i - 1)];

		for (j = 2 * i; j > 1; --j)
		{
			RetVal[2 * j] += b[2 * i] * RetVal[2 * (j - 1)] - b[2 * i + 1] * RetVal[2 * (j - 1) + 1] +
				c[2 * i] * RetVal[2 * (j - 2)] - c[2 * i + 1] * RetVal[2 * (j - 2) + 1];
			RetVal[2 * j + 1] += b[2 * i] * RetVal[2 * (j - 1) + 1] + b[2 * i + 1] * RetVal[2 * (j - 1)] +
				c[2 * i] * RetVal[2 * (j - 2) + 1] + c[2 * i + 1] * RetVal[2 * (j - 2)];
		}

		RetVal[2] += b[2 * i] * RetVal[0] - b[2 * i + 1] * RetVal[1] + c[2 * i];
		RetVal[3] += b[2 * i] * RetVal[1] + b[2 * i + 1] * RetVal[0] + c[2 * i + 1];
		RetVal[0] += b[2 * i];
		RetVal[1] += b[2 * i + 1];
	}

	return RetVal;
}


export function ComputeNumCoeffs(FilterOrder: number, Lcutoff: number, Ucutoff: number, DenC: number[]) : number[]
{
	let TCoeffs = [];
	let NumCoeffs = new Array<number>(2 * FilterOrder + 1);
	let NormalizedKernel = new Array<Complex>(2 * FilterOrder + 1);

	let Numbers = new Array<number>();
	for (let n = 0; n < FilterOrder * 2 + 1; n++)
		Numbers.push(n);

	let i;

	TCoeffs = ComputeHP(FilterOrder);

	for (i = 0; i < FilterOrder; ++i)
	{
		NumCoeffs[2 * i] = TCoeffs[i];
		NumCoeffs[2 * i + 1] = 0.0;
	}
	NumCoeffs[2 * FilterOrder] = TCoeffs[FilterOrder];

	let cp = new Array<number>(2);
	let Bw
	let Wn;
	cp[0] = 2 * 2.0*Math.tan(Math.PI * Lcutoff / 2.0);
	cp[1] = 2 * 2.0*Math.tan(Math.PI * Ucutoff / 2.0);

	Bw = cp[1] - cp[0];
	//center frequency
	Wn = Math.sqrt(cp[0] * cp[1]);
	Wn = 2 * Math.atan2(Wn, 4);
	let kern;
	let result = new Complex(-1, 0);

	for (let k = 0; k < FilterOrder * 2 + 1; k++)
	{
		let tmp = result.sqrt();
		let m = Wn * Numbers[k] * -1;
		tmp.re *= m;
		tmp.im *= m;
		NormalizedKernel[k] = tmp.exp();
	}

	let b = 0;
	let den = 0;
	for (let d = 0; d < FilterOrder * 2 + 1; d++)
	{
		let m = NormalizedKernel[d].re * NumCoeffs[d];
		let t = NormalizedKernel[d].re * DenC[d];
		b += m;

		den += t;
	}
	for (let c = 0; c < FilterOrder * 2 + 1; c++)
	{
		NumCoeffs[c] = (NumCoeffs[c] * den) / b;
	}

	for (let i = NumCoeffs.length - 1; i > FilterOrder * 2 + 1; i--)
		NumCoeffs.pop();

	return NumCoeffs;
}

function ComputeHP(FilterOrder: number) : number[]
{
	let NumCoeffs = [];
	let i;

	NumCoeffs = ComputeLP(FilterOrder);

	for (i = 0; i <= FilterOrder; ++i)
		if (i % 2) NumCoeffs[i] = -NumCoeffs[i];

	return NumCoeffs;
}

function ComputeLP(FilterOrder: number) : number[]
{
	let NumCoeffs = new Array<number>(FilterOrder + 1);
	let m;
	let i;

	NumCoeffs[0] = 1;
	NumCoeffs[1] = FilterOrder;
	m = FilterOrder / 2;
	for (i = 2; i <= m; ++i)
	{
		NumCoeffs[i] = (FilterOrder - i + 1) * NumCoeffs[i - 1] / i;
		NumCoeffs[FilterOrder - i] = NumCoeffs[i];
	}
	NumCoeffs[FilterOrder - 1] = FilterOrder;
	NumCoeffs[FilterOrder] = 1;

	return NumCoeffs;
}

export function filter(x : number[], coeff_b : number[], coeff_a : number[]) : number[]
{
	let len_x = x.length;
	let len_b = coeff_b.length
	let len_a = coeff_a.length;

	let zi = new Array<number>(len_b);
	zi.fill(0);
	let filter_x = new Array<number>(len_x);
	filter_x.fill(0);
	if (len_a == 1)
	{
		for (let m = 0; m < len_x; m++)
		{
			filter_x[m] = coeff_b[0] * x[m] + zi[0];
			for (let i = 1; i < len_b; i++)
			{
				zi[i - 1] = coeff_b[i] * x[m] + zi[i];//-coeff_a[i]*filter_x[m];
			}
		}
	}
	else
	{
		for (let m = 0; m < len_x; m++)
		{
			filter_x[m] = coeff_b[0] * x[m] + zi[0];
			for (let i = 1; i < len_b; i++)
			{
				zi[i - 1] = coeff_b[i] * x[m] + zi[i] - coeff_a[i] * filter_x[m];
			}
		}
	}

	return filter_x;
}
*/
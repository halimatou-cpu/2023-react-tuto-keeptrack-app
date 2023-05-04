import App from '../App';

interface Props {

}

export default function ProjectForm () {
	
	return (
		<form action="" className="input-group vertical">
			<label htmlFor="name">Project Name</label>
			<input type="text" name="name" placeholder="enter name" />
			<label htmlFor="description">Project Description</label>
			<textarea name="description" id="" placeholder="enter description"></textarea>
			<label htmlFor="budget">Project Budget</label>
			<input type="text" name="budget" id="" placeholder="enter budget"/>
			<label htmlFor="isActive">Active ?</label>
			<input type="checkbox" name='isActive' />
			<div className='input-group'>
				<button type='submit' className='primary bordered medium'>Save</button>
				<button type='reset' className='bordered medium'>Cancel</button>
			</div>
		</form>
	)
}
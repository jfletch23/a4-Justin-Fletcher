import './Form.css'

function Form() {
    return (
        <form>
            <h2>Fill Out Scouting Report</h2>
            <label htmlFor="player_name">Enter player name</label>
            <input type="text" id="player_name" name="player_name" defaultValue="Kade Anderson" required />
            <label htmlFor="player_birthday">Enter player birthday</label>
            <input type="date" id="player_birthday" name="player_birthday" required />
            <label htmlFor="player_position">Select player's position</label>
            <select name="player_position" id="player_position" required>
                <option value="">Choose a position</option>
                <option value="Pitcher">Pitcher</option>
                <option value="Catcher">Catcher</option>
                <option value="First Base">First Base</option>
                <option value="Second Base">Second Base</option>
                <option value="Third Base">Third Base</option>
                <option value="Shortstop">Shortstop</option>
                <option value="Left Field">Left Field</option>
                <option value="Center Field">Center Field</option>
                <option value="Right Field">Right Field</option>
            </select>
            <fieldset>
                <legend>Enter a player's batting handedness</legend>
                <div className="radio_group">
                    <input type="radio" id="batting_right" name="batting" value="Right" required />
                    <label htmlFor="batting_right">Right</label>              
                </div>
                <div className="radio_group">
                    <input type="radio" id="batting_left" name="batting" value="Left" required />
                    <label htmlFor="batting_left">Left</label>
                </div>
                <div className="radio_group">
                    <input type="radio" id="batting_switch" name="batting" value="Switch" required />
                    <label htmlFor="batting_switch">Switch</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Enter a player's throwing handedness</legend>
                <div className="radio_group">
                    <input type="radio" id="throwing_right" name="throwing" value="Right" required />
                    <label htmlFor="throwing_right">Right</label>              
                </div>
                <div className="radio_group">
                    <input type="radio" id="throwing_left" name="throwing" value="Left" required />
                    <label htmlFor="throwing_left">Left</label>
                </div>
                <div className="radio_group">
                    <input type="radio" id="throwing_switch" name="throwing" value="Switch" required />
                    <label htmlFor="throwing_switch">Switch</label>
                </div>            
            </fieldset>
            <label htmlFor="hit_tool">Enter player's hit tool rating</label>
            <input type="number" id="hit_tool" name="hit_tool" min="20" max="80" step="5" defaultValue="50" required />
            <label htmlFor="power_tool">Enter player's power tool rating</label>
            <input type="number" id="power_tool" name="power_tool" min="20" max="80" step="5" defaultValue="50" required />
            <label htmlFor="run_tool">Enter player's run tool rating</label>
            <input type="number" id="run_tool" name="run_tool" min="20" max="80" step="5" defaultValue="50" required />
            <label htmlFor="arm_tool">Enter player's arm tool rating</label>
            <input type="number" id="arm_tool" name="arm_tool" min="20" max="80" step="5" defaultValue="50" required />
            <label htmlFor="field_tool">Enter player's field tool rating</label>
            <input type="number" id="field_tool" name="field_tool" min="20" max="80" step="5" defaultValue="50" required /> 
            <button type="submit">Submit</button>            
        </form>
    )
}

export default Form